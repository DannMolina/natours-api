/**
 * express is a minimal nodejs framework, a higher level of abstraction
 * it is a framework on top of nodejs
 * written using 100% nodejs code
 */
const fs = require('fs');
const express = require('express');
const res = require('express/lib/response');

// * assign/call the express function
const app = express();

/**
 * Middleware is basically a function that can modify the incoming request data.
 * it stands between, so in the middle of the request and the response.
 */
app.use(express.json());

/**
 * Create route with express
 * - routing means basically to determine how an applications responds
 *   to a certain client request, so to a certain URL and it's not just the URL
 *   but also the http method which is used for the request(get, post) and etc.
 */

// * arguments = <route>, <callback fn>(request, response)
// app.get('/', (req, res) => {
// 	res.status(200).json({
// 		message: 'Hello from server!',
// 		app: 'Natours',
// 	});
// });

// app.post('/', (req, res) => {
// 	res.status(200).json({
// 		message: 'You can post to this input...',
// 		app: 'Natours',
// 	});
// });

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
	res.status(200).json({
		status: 'sucess',
		results: tours.length,
		data: {
			tours: tours,
		},
	});
});

/**
 * :id = variable
 * :optional = just add ?
 * req.params = read parameters from the url
 */
app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

/**
 * http method to updated data
 * PUT & PATCH
 * PUT = application expect to receives the entire new updated object
 * PATCH = with patch we only expect the properties that should actually be updated on the object
 */
app.patch('/api/v1/tours/:id', (req, res) => {
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
});

/**
 * 204 = no content
 */
app.delete('/api/v1/tours/:id', (req, res) => {
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
});

// * port
const port = 3000;

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
