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
 * - model name will represent the collection name
 * - note: collections always ends with letter 's' even if you did not put an 's' on it
 */
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
