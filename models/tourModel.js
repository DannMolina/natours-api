const mongoose = require('mongoose'); // mongoDB driver

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
        trim: true,
    },
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
});

/**
 * Model
 * - model name will represent the collection name
 * - note: collections always ends with letter 's' even if you did not put an 's' on it
 */
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
