const mongoose = require('mongoose'); // mongoDB driver
const slugify = require('slugify');
/**
 * SCHEMA
 */
const tourSchema = new mongoose.Schema(
    {
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
            trim: true,
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, 'A tour must have a duration'],
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'A tour must have a group size'],
        },
        difficulty: {
            type: String,
            required: [true, 'A tour must have a difficulty'],
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price'],
        },
        priceDiscount: Number,
        summary: {
            type: String,
            trim: true, // * it only works on string, will remove all the white spaces in the beginning and end of the string
            required: [true, 'A tour must have a description'],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, 'A tour must have a cover image'],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false, // exclude this field, option to not include in the response object, default to true
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false,
        },
    },
    {
        // oject for the options
        toJSON: { virtuals: true }, // virtuals be part of the output
        toObject: { virtuals: true },
    },
);

/**
 * Business logic: compute the duration in weeks
 * this virtual property here will basically be created each time that we get some data out of the database.
 * use regular function instead of arrow function because arrow function does not get the 'this' keyword
 * 'durationWeeks' property is not part of the database
 */
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7; // "this" keyword is currently pointing to the current document
});

/**
 | --------------------------
 | START: DOCUMENT MIDDLWARE
 | --------------------------
 */
/**
 * pre() middleware = going to run before an actual event and that event in this case is the "save"
 * DOCUMENT MIDDLEWARE: runs before .save() command and .create()
 * 'save' = can also called as hook
 */
tourSchema.pre(
    'save',
    // callback function => call before an actual document save into the database
    function (next) {
        // mongoose also has a next function middleware, each middleware fn in a pre-save middleware has access to next()
        // console.log(this);
        this.slug = slugify(this.name, { lower: true });
        next();
    },
);

// tourSchema.pre('save', function (next) {
//     console.log('Will save document...');

//     next();
// });

// /**
//  * post() middleware functions are executed after all the pre middleware functions have completed
//  */
// tourSchema.post(
//     'save',
//     // callback function => call before an actual document save into the database
//     function (doc, next) {
//         console.log(doc);

//         next();
//     },
// );
/**
 | --------------------------
 | END
 | --------------------------
 */
/**
 | --------------------------
 | START: QUERY MIDDLEWARE
 | --------------------------
 */
/**
 * Middleware allows us to run functions before or after a certain query is executed
 */

// pre-find hook
// /^find/ = mean all the strings that start with find
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });

    this.start = Date.now();
    next();
});

// docs = all documents that were returned from the query
tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    console.log(docs);

    next();
});
/**
 | --------------------------
 | END
 | --------------------------
 */

/**
 | --------------------------
 | START: AGGREGATION MIDDLEWARE
 | --------------------------
 */

tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    console.log(this.pipeline(), 'PIPELINE');
    next();
});

/**
 | --------------------------
 | END
 | --------------------------
 */

/**
 * Model
 * - model name will represent the collection name
 * - note: collections always ends with letter 's' even if you did not put an 's' on it
 */
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
