class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`,
        );

        this.query = this.query.find(JSON.parse(queryStr)); // let query = Tour.find(JSON.parse(queryStr));

        /**
         * in order to return the entire object which of course then has access to the other methods
         */
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        /**
         * in order to return the entire object which of course then has access to the other methods
         */
        return this;
    }

    limitFields() {
        // Field limiting
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        /**
         * in order to return the entire object which of course then has access to the other methods
         */
        return this;
    }

    paginate() {
        // Pagination
        const page = this.queryString.page * 1 || 1; // added multiply by one to convert string to number
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit; // skip formula

        this.query = this.query.skip(skip).limit(limit);

        /**
         * in order to return the entire object which of course then has access to the other methods
         */
        return this;
    }
}

module.exports = APIFeatures;
