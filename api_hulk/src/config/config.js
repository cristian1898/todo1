const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'hulk_store',
    MONGO_PORT: process.env.MONGO_PORT_DB || 27017,
    MONGO_HOST: process.env.MONGO_HOST || 'mongo',
    MONGO_USER: process.env.MONGO_USER || 'root',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'rootpassword',
    PORT: process.env.PORT || 3001,
    HOST_SERVER: process.env.HOST_SERVER || 'http://localhost',
    FRONT_URL: process.env.FRONT_URL || '/',
    WORKCLEANCODE_DOMAIN: process.env.WORKCLEANCODE_DOMAIN || 'localhost'
    
}