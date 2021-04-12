
const exitsDTO = require("./dto");
const productDAO = require("../product/dao");
const exitsModel = require("./model");
const mongoose = require("mongoose");
const Decimal = require('decimal.js-light');
module.exports = class exitsDAO {

  static async findAndCreate(obj, id_product) {
    try {
      let formatExitsData = await exitsDTO.create(obj);
      formatExitsData.product = id_product;
      formatExitsData.value_total = new Decimal(formatExitsData.value_unit).mul(formatExitsData.quantity).toNumber().toFixed(2);



      const exitsCreated = await exitsModel.findOne({ document: formatExitsData.document, product: id_product }) ? 'exist' : await exitsModel.create(formatExitsData);

      let product = true;
      if (exitsCreated && exitsCreated._id) {

        product = await productDAO.exitsInProduct(exitsCreated, id_product);
        !product ? await deleteExit(exitsCreated.id) : null;

      }




      return !product ? product : exitsCreated;

    } catch (error) {

      return false;

    }
  }
  static async list(id_product) {
    try {
      const listExitss = await exitsModel.find({ product: id_product }, { '__v': 0 });
      return listExitss;
    } catch (error) {
      return false;
    }
  }
  static async readOneId(id_product, id_entrie) {
    try {
      const oneExits = await exitsModel.findOne({ _id: id_entrie, product: id_product }, { '__v': 0 });
      return oneExits ? oneExits : {};

    } catch (error) {

      return false;
    }
  }
  static async search(obj) {
    try {
      /**console.log(obj, '..')
       const serachResults = await exitsModel.find({
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
const deleteExit = async (id) => {
  try {
    await exitsModel.findByIdAndDelete(id);
    return
  } catch (errr) {
    return
  }

}