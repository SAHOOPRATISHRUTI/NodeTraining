const mongoose = require('mongoose');

// Use the connection string from environment variables
const dbUrl = `${process.env.DATABASE_LOCAL_URL}/${process.env.DB_NAME}`;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbUrl);
        console.info(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
