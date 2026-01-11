const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error('\n\x1b[31m%s\x1b[0m', 'CRITICAL ERROR: Could not connect to MongoDB.');
        console.error('Please ensure that:');
        console.error('1. MongoDB is installed and running locally on port 27017');
        console.error('2. OR you have Docker running and can use "docker compose up -d"');
        console.error('3. OR you have updated server/.env with a valid MongoDB Atlas URI\n');
        process.exit(1);
    }
};

module.exports = connectDB;