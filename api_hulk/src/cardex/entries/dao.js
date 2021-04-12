
const entriesDTO = require("./dto");
const productDAO = require("../product/dao");
const entriesModel = require("./model");
const mongoose = require("mongoose");
const Decimal = require('decimal.js-light');
module.exports = class entriesDAO {

  static async findAndCreate(obj, id_product) {
    try {
      let formatEntriesData = await entriesDTO.create(obj);
      formatEntriesData.product = id_product;

      formatEntriesData.value_total = new Decimal(formatEntriesData.value_unit).mul(formatEntriesData.quantity).toNumber().toFixed(2);



      const entriesCreated = await entriesModel.findOne({ document: formatEntriesData.document, product: id_product }) ? 'exist' : await entriesModel.create(formatEntriesData);

      let product = true;
      if (entriesCreated && entriesCreated._id) {
        product = await productDAO.entriesInProduct(entriesCreated, id_product);
        !product ? await deleteEntri(entriesCreated.id) : null;

      }




      return !product ? product : entriesCreated;

    } catch (error) {

      return false;

    }
  }
  static async list(id_product) {
    try {
      const listentriess = await entriesModel.find({ product: id_product }, { '__v': 0 });
      return listentriess;
    } catch (error) {
      return false;
    }
  }
  static async readOneId(id_product, id_entrie) {
    try {
      const oneentries = await entriesModel.findOne({ _id: id_entrie, product: id_product }, { '__v': 0 });
      return oneentries ? oneentries : {};

    } catch (error) {

      return false;
    }
  }
  static async search(obj) {
    try {
      /**console.log(obj, '..')
       const serachResults = await entriesModel.find({
         $or: [
           { name: { $regex: ".*" + obj.name + ".*", $options: 'i' } },
           { email: { $regex: ".*" + obj.email + ".*", $options: 'i' } },
           { phone: { $regex: ".*" + obj.phone + ".*", $options: 'i' } }
 
 
         ]
       }).sort({ createdAt: obj.order ? -1 : 1 }).limit(Number(obj.limit));*/
      // return serachResults;
    } catch (error) {

    }
  }


}


const deleteEntri = async (id) => {
  try {
    await entriesModel.findByIdAndDelete(id);
    return
  } catch (errr) {
    return
  }

}