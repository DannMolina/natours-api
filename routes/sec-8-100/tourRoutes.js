const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router(); // * middleware

/**
 * Middleware
 */
const { checkIDMiddleware, checkBodyMiddleware } = tourController;

/**
 * param middleware
 * specify first the parameter which is the "id" that we want to search for
 * /api/v1/tours/:id
 */
// router.param('id', (req, res, next, val) => {
// 	console.log(`Tour id is: ${val}`);

// 	// * call the middleware
// 	next();
// });
// router.param('id', checkIDMiddleware);
// tourController.aliasTopTours = middleware
router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours); // '/api/v1/tours/top-5-cheap'

// * from app.route to router.route
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour); // '/api/v1/tours'
router
    .route('/:id') // '/api/v1/tours/:id'
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
