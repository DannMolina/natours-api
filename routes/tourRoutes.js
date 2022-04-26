const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router(); // * middleware

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
