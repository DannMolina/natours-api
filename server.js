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
 * Note: mongoose is all about model,
 * create model in mongoose in order to create documents using it
 * and also to query update and delete these documents
 * so basically, to perform each of the CRUD operation, create, read, update and delete
 * we need a Mongoose model, and in order to create a MODEL, we nee a SCHEMA.
 *
 * Create models out of mongoose schema
 */
const mongoose = require('mongoose'); // mongoDB driver
const dotenv = require('dotenv'); // use to store the variable to the nodejs environment variable
/**
 * read the variables from the file and save them into nodejs environment variable
 * note: the reading of the variables from the file which happens here to the node process
 * only needs to happen once.
 * it's then in the process is the same no matter in what file we are.
 * note: ENV variables are on the "process"
 */
dotenv.config({ path: './config.env' });

/**
 * DB is the hosted database
 */
const DB = process.env.DATABASE.replace(
    '<PASSWORD>', // * replace the <PASSWORD> on our connection string with the ENV DATABASE_PASSWORD
    process.env.DATABASE_PASSWORD,
);
/**
 * Parameters
 * - connection string, object with some options to deal with deprecations warning
 * - process.env.DATABASE_LOCAL for local database
 */
mongoose
    .connect(DB, {
        // * hosted database version
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((con) => {
        console.log('DB connection successful!');
    });

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
 * SCHEMA
 */
const tourSchema = new mongoose.Schema({
    /**
     * property:{}
     * sample of schema type options and they can be different for different types
     * and can add validation options
     * see: documents for more options
     */
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    },
});

/**
 * Model
 */
const Tour = mongoose.model('Tour', tourSchema);

/**
 * START SERVER
 */
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
