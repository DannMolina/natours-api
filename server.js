/**
 * server.js will be the starting file where everything starts
 * and it's there when we listen to our server
 *
 * Can also put other stuff that is not related to express
 * but still related to application as an entry point:
 *  - database config
 *  - error handling
 *  - environment variables
 */
const app = require('./app');
/**
 * START SERVER
 */
const port = 3000;

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
