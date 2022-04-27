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
/**
 *
 */
const dotenv = require('dotenv'); // use to store the variable to the nodejs environment variable
/**
 * read the variables from the file and save them into nodejs environment variable
 * note: the reading of the variables from the file which happens here to the node process
 * only needs to happen once.
 * it's then in the process is the same no matter in what file we are.
 * note: ENV variables are on the "process"
 */
dotenv.config({ path: './config.env' });

const app = require('./app');

/**
 * GET ENV VARIABLE
 * - environment variables are global variables that are used
 * to define the environment in which a node app is running.
 * - app.get('env') = from express/set by express
 * - process.env = from nodejs/ set by nodejs
 */
// console.log(process.env);

/**
 * START SERVER
 */
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
