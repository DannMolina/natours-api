/**
 * express is a minimal nodejs framework, a higher level of abstraction
 * it is a framework on top of nodejs
 * written using 100% nodejs code
 */
const express = require('express');
const morgan = require('morgan'); // * logging middleware

// * router
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// * assign/call the express function
const app = express();

/**
 * MIDDLWARES
 */
/**
 * Middleware is basically a function that can modify the incoming request data.
 * it stands between, so in the middle of the request and the response.
 */

// * run only the logger if the env is in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // logging middleware
}

app.use(express.json()); // object res middleware

/**
 * no need to put the /public to url
 * set "public" as a root
 */
app.use(express.static(`${__dirname}/public`)); // serve static file

/**
 * next() is the middleware
 * define global middleware before all route handlers
 * middleware runs first before the route handlers
 */
app.use((req, res, next) => {
    console.log('Hello from the middleware!');

    // * call next middleware
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    // * call next middleware
    next();
});

/**
 * Using ROUTES
 */

// * mount a router on specific route =  app.use (to mount the router)
app.use('/api/v1/tours', tourRouter); // * use middleware on specific route
app.use('/api/v1/users', userRouter);

module.exports = app;
