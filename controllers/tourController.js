const fs = require('fs');

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
	console.log(req.requestTime);

	res.status(200).json({
		status: 'sucess',
		requestedAt: req.requestTime,
		results: tours.length,
		data: {
			tours: tours,
		},
	});
};

/**
 * :id = variable
 * :optional = just add ?
 * req.params = read parameters from the url
 */
exports.getTour = (req, res) => {
	const id = req.params.id * 1; // convert string to number
	const tour = tours.find((el) => el.id === id);

	// if (id > tours.length) {
	if (!tour) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}

	res.status(200).json({
		status: 'sucess',
		// results: tours.length,
		data: {
			tour: tour,
		},
	});
};

exports.createTour = (req, res) => {
	// console.log(req.body);
	const newId = tours[tours.length - 1].id + 1;
	// Object.assign allows us to create a new objefct by mergin two existing objects together
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: 'success',
				data: {
					tour: newTour,
				},
			});
		}
	);
};

/**
 * http method to updated data
 * PUT & PATCH
 * PUT = application expect to receives the entire new updated object
 * PATCH = with patch we only expect the properties that should actually be updated on the object
 */
exports.updateTour = (req, res) => {
	// * check if id is valid
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}

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
	// * check if id is valid
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
};
