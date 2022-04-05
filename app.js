/**
 * express is a minimal nodejs framework, a higher level of abstraction
 * it is a framework on top of nodejs
 * written using 100% nodejs code
 */
const express = require('express');

// * assign/call the express function
const app = express();

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

app.get('/api/v1/tours');

// * port
const port = 3000;

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
