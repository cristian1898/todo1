
const config = require('../config/config');
module.exports = class globalHooks {
  static validateData(obj, keys) {
    try {
      if (!obj || !Array.isArray(keys)) return false;


      const implementKeys = keys.reduce((impl, key) => impl && key in obj, true);

      return implementKeys;
    } catch (error) {
      return false;
    }
  }
  static verifyEmailValidFormat(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  static deleteNullValuesForObject(obj) {


    Object.keys(obj).forEach(k =>

      (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||

      (!obj[k] && obj[k] !== undefined) && delete obj[k]

    );

    return obj;


  }

}
