const fs = require('fs');
const mongoose = require('mongoose'); // mongoDB driver
const dotenv = require('dotenv'); // use to store the variable to the nodejs environment variable
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>', // * replace the <PASSWORD> on our connection string with the ENV DATABASE_PASSWORD
    process.env.DATABASE_PASSWORD,
);

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

// READ JSON FILE
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// IMPORT DATA INTO DATABASE
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');

        // stop application
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany(); // delete all documents on tours collection
        console.log('Data successfully deleted!');

        // stop application
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);
