const Tour = require('./../models/tourModel');

/**
 * Create a checkBody middleware
 * Check if the body contains the name and price property
 * if not, send back 400 (bad request)
 * Add it to the post handler stack
 */
exports.checkBodyMiddleware = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price!',
        });
    }
    next();
};

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'sucess',
        requestedAt: req.requestTime,
        // results: tours.length,
        // data: {
        //     tours: tours,
        // },
    });
};

/**
 * :id = variable
 * :optional = just add ?
 * req.params = read parameters from the url
 */
exports.getTour = (req, res) => {
    const id = req.params.id * 1; // convert string to number
    // const tour = tours.find((el) => el.id === id);

    // res.status(200).json({
    //     status: 'sucess',
    //     // results: tours.length,
    //     data: {
    //         tour: tour,
    //     },
    // });
};

exports.createTour = (req, res) => {
    res.status(201).json({
        status: 'success',
        //    data: {
        //        tour: newTour,
        //    },
    });
};

/**
 * http method to updated data
 * PUT & PATCH
 * PUT = application expect to receives the entire new updated object
 * PATCH = with patch we only expect the properties that should actually be updated on the object
 */
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        },
    });
};

/**
 * 204 = no content
 */
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
};
