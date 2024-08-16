const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: +process.env.PORT,
    REDIS_PORT: +process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    MONGODB_URL: process.env.MONGODB_URL,
    PROBLEM_ADMIN_SERVICE_URL: process.env.PROBLEM_ADMIN_SERVICE_URL
}