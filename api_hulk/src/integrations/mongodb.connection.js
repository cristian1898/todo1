const config = require('../config/config');
const mongoose = require('mongoose');

module.exports = class DB {
  static connect() {
    const db_connect = `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`
    mongoose.connect(db_connect, {
      promiseLibrary: global.Promise,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('data dabase is conect', db_connect)
  }

}
