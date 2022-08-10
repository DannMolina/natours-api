const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/apifeatures');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage, price';
    req.query.fields = 'name, price, ratingsAverage, summary, difficulty';

    next();
};

/**
 * Get documents from the database collection using moongoose find method via get request
 * @param {*} req request via get
 * @param {*} res response
 */
exports.getAllTours = async (req, res) => {
    try {
        /**
         * EXECUTE QUERY
         */
        /**
         * Create a new object/intance of the APIFeatures class.
         * In there, we are parsing a query object and the query string that's coming from express.
         */
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const tours = await features.query; // await query here
        // moongoose query methods: query.sort().select().skip().limit()

        // SEND RESPONSE
        res.status(200).json({
            status: 'sucess',
            requestedAt: req.requestTime,
            results: tours.length,
            data: {
                tours: tours,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'Error!',
        });
    }
};

/**
 * :id = variable
 * :optional = just add ?
 * req.params = read parameters from the url
 */
/**
 * Get document from the database collection using moongoose findById method via get request
 * @param {*} req request via get
 * @param {*} res response
 */
exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        // const tour = await Tour.findOne({ name: req.params.name });
        // * Tour.findOne({_id: req.params.id}) will work same way as await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tour: tour,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'Error!',
        });
    }
};

/**
 * Insert document to database collection using moongoose create method via post request
 * @param {*} req request via post
 * @param {*} res response
 */
exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error,
        });
    }
};

/**
 * http method to updated data
 * PUT & PATCH
 * PUT = application expect to receives the entire new updated object
 * PATCH = with patch we only expect the properties that should actually be updated on the object
 */
exports.updateTour = async (req, res) => {
    try {
        // * id to be updated, updated object, option
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // the new updated document is the one that will be returned
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour: tour,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};

/**
 * 204 = no content
 */
exports.deleteTour = async (req, res) => {
    try {
        const deleteTour = await Tour.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'successfully deleted',
            data: deleteTour,
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'Error!',
        });
    }
};

/**
 * Calculate a couple of statistics about our tours.
 * Now the aggregation pipeline really is a MongoDB feature. But Mongoose, gives us access to it,
 * so that we can use it in the Mongoose driver.
 * http://localhost:3000/api/v1/tours/tour-stats
 */
exports.getTourStats = async (req, res) => {
    try {
        /**
         * The aggregation pipeline is a MongoDB feature. But Mongoose, of course, gives us access to it,
         * so that we can use it in the Mongoose driver, So using the tour model in order to access the tour collection,
         * we say "tour.aggregate". And so the aggregation pipeline is a bit like a regular query
         *  and so using the aggregation pipeline it's a just a bit like doing a regular query.
         * The difference here is that in aggregations,  we can manipulate the data in a couple of different steps
         */
        const stats = await Tour.aggregate(
            /**
             * STEPS:
             * Each of the element of the array is the stages and each of the stages is an object {}
             */
            [
                /**
                 * Match stage: it is just a query
                 * Filters the document stream to allow only matching documents to pass unmodified into the next pipeline stage
                 */
                {
                    $match: {
                        ratingsAverage: { $gte: 4.5 },
                    },
                },
                /**
                 * Group stage:
                 * Groups input documents by a specified identifier expression and applies the accumulator expression(s), if specified, to each group.
                 */
                {
                    $group: {
                        // _id: null, // calculate and display as one result
                        // _id: '$name', // group result by tour name field
                        _id: { $toUpper: '$difficulty' }, // added some mongoDB operator "$toUpper"
                        // _id: '$difficulty', // group results based on fields, use the "difficulty" as an example
                        numTours: { $sum: 1 }, // number of tours, add 1 every number of documents we go through
                        numRatings: { $sum: '$ratingsQuantity' },
                        avgRating: { $avg: '$ratingsAverage' }, // $avg is a mongoDB operator. Calculate average rating. $ratingsAverage is a field name
                        avgPrice: { $avg: '$price' }, // calculate average price
                        minPrice: { $min: '$price' }, // calculate min price
                        minPrice: { $max: '$price' }, // calculate max price
                    },
                },
                {
                    $sort: { avgPrice: 1 }, // 1 = ascending, -1= descending
                },
                {
                    /**
                     * It is also allowed to repeat stages.
                     * $ne = mongoDB operator (not equal)
                     * using $ne: { $ne: 'EASY'} = exclude the one that says EASY
                     */
                    $match: { _id: { $ne: 'EASY' } },
                },
            ],
        );
        res.status(200).json({
            status: 'success',
            message: 'Success',
            data: {
                stats,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'Error!',
        });
    }
};
