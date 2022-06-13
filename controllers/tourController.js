const Tour = require('./../models/tourModel');

/**
 * Get documents from the database collection using moongoose find method via get request
 * @param {*} req request via get
 * @param {*} res response
 */
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();

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
