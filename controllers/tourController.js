const Tour = require('./../models/tourModel');

/**
 * Get documents from the database collection using moongoose find method via get request
 * @param {*} req request via get
 * @param {*} res response
 */
exports.getAllTours = async (req, res) => {
    try {
        /**
         * EXCLUDE
         * BUILD QUERY
         */
        // * 1) Filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        // * 2) Advance Filtering
        let queryStr = JSON.stringify(queryObj);

        /**
         * /\b(gte|gt|lte|lt)\b/ = match only with the char inside parenthesis using \b\b
         * g = happen multiple time
         * match(arrow fn) = replace with "$"
         * $gte|$gt|$lte|$lt = mongoDB operators
         */
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`,
        );

        /**
         * queries
         * there are 2 types of writing database queries
         * 1st: use filter object
         * 2nd: use some special mongoose methods
         */
        console.log(req.query, queryObj);

        /**
         * EXECUTE QUERY
         */
        // 1st
        // const tours = await Tour.find({
        //     duration: 5,
        //     difficulty: 'easy',
        // });
        /**
         * save this part into a query then in the end
         * as soon as we change all the methods to the query that we need to, only then by the end we can await that query
         * For example, we're going to use the sort method.
         * We're going to use the predict method,
         * and we're going to use, really, a bunch of methods, and chain them to this query.
         */
        // const query = Tour.find(queryObj); // * 1) api/v1/tours?duration=5&difficulty=easy&price=1500
        // const query = Tour.find(JSON.parse(queryStr)); // * 2) api/v1/tours?duration[gte]=5&difficulty=easy&price[lt]=1500

        let query = Tour.find(JSON.parse(queryStr));

        // 2) Sorting
        // default sort is ascending = http://localhost:3000/api/v1/tours?sort=price
        // sort descending just add "-" sample "sort=-" = http://localhost:3000/api/v1/tours?sort=-price note: applicable on .sort()
        // sort descending just add "-" sample "sort=-" = http://localhost:3000/api/v1/tours?sort=-price,ratingsAverage .sort()
        // sort with more than one criteria just add "," = http://localhost:3000/api/v1/tours?sort=-price,ratingsAverage
        // it will sort first the price then the ratingsAverage
        if (req.query.sort) {
            /**
             * split it by comma, and so this will then return an array of all the strings,
             * and then all we have to do is to put it back together using join, and as the "join" string we use a space.
             */

            // query = query.sort(req.query.sort);
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy); // sortBy('-price -ratingsAverage'); note: sortBy value separated by space
        } else {
            // * default query if not provided upon request
            // * default is ascending, ordered by the date the document created
            query = query.sort('-createdAt');
        }

        // 3) Field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields); // note: fields value separated by space
        } else {
            // default query if not provided upon request
            // minus sign '-' is then not including but excluding note: applicable on .select()
            // http://localhost:3000/api/v1/tours?fields=-name,-duration sample: exclude name and duration to the response
            // field can also be excluded directly to schema sample: field:{select: false}
            query = query.select('-__v'); // exclude this field, you can exclude one or more fields
        }

        // 4) Pagination
        /**
         * skip = amount of result that should be skipped before actually querying data
         * limit = amount of result that we want in the query
         *
         * Sample: User wants page number 2 with 10 results per page, that means that results
         * 1 to 10 are on page one and 11 to 20 on page 2
         * URL: page=2&limit=10, 1-10 page 1, 11-20 page 2
         */
        // by default is page number 1 and limit to 100
        const page = req.query.page * 1 || 1; // added multiply by one to convert string to number
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit; // skip formula

        query = query.skip(skip).limit(limit);

        // * happen if there's a page in the query
        if (req.query.page) {
            const numTours = await Tour.countDocuments(); // countDocuments() = return the number of documents
            if (skip >= numTours) {
                throw new Error('This page does not exist');
            }
        }
        /**
         * EXECUTE QUERY
         * await query here
         */
        const tours = await query;
        // moongoose query methods: query.sort().select().skip().limit()

        // 2nd
        // const query = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy');

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
            message: 'Error!',
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
