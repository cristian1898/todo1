
const exitsDTO = require("./dto");
const productsDAO = require("../product/dao");
const exitsModel = require("./model");
const mongoose = require("mongoose");
const Decimal = require('decimal.js-light');
const productsModel = require('../product/model')
module.exports = class exitsDAO {

  static async findAndCreate(obj, id_product) {
    try {
      let formatExitsData = await exitsDTO.create(obj);
      formatExitsData.product = id_product;
      formatExitsData.value_total = new Decimal(formatExitsData.value_unit).mul(formatExitsData.quantity).toNumber().toFixed(2);
      console.log(formatExitsData)


      const exitsCreated = await exitsModel.findOne({ document: formatExitsData.document, product: id_product }) ? 'exist' : await exitsModel.create(formatExitsData);
      console.log('entree exitsCreated', exitsCreated)
      let product = true;
      if (exitsCreated && exitsCreated._id) {
        console.log('-----------------eeeeeeeeeeeeeeeee--------------', id_product)
        product = await exitsNewInProduct(exitsCreated, id_product);


        
        !product ? await deleteExit(exitsCreated.id) : null;

      }




      return !product ? product : exitsCreated;

    } catch (error) {
      console.log(error, 'error dao exits');
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
      console.log(error)
      return false;
    }
  }
  static async update(id,obj) {
    try {
      const updateExits = await exitsModel.findByIdAndUpdate(id, obj);
      return updateExits;
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
const exitsNewInProduct = async(exit, product_id) => {
  try {
    console.log('----', exit, product_id)
    let updateProduct = await productsModel.findById(product_id);
    console.log(updateProduct, 'sistemass products', exit);
    let updateProductCalculate = await exitsIngresOrReturns(exit, updateProduct);
    if (!updateProductCalculate) {
      return false;
    }
    
    updateProductCalculate.exits.push(exit._id);
    console.log('-ffffff------------------------------', updateProductCalculate)
    const saveproduct = await updateProductCalculate.save();


    console.log(saveproduct, 'sistemass products')
  

    return saveproduct;


  } catch (error) {
    console.log(error, 'eee')
    return false;
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
const exitsIngresOrReturns = (exit, product) => {
  console.log(exit, product, '888888888888888888888888888')
  let quantity = new Decimal(product.quantity);
  let value_unit = new Decimal(product.value_unit);
  let value_total = new Decimal(product.value_total);

  switch (exit.types) {

    case 'EXIT':
      if (exit.quantity <= product.quantity) {


        product.quantity = quantity.sub(exit.quantity).toNumber();
        const newExitTotal = value_unit.mul(exit.quantity).toNumber();
        product.value_total = value_total.sub(newExitTotal).toNumber().toFixed(2);
        product.value_unit = new Decimal(product.value_total).div(product.quantity).toNumber().toFixed(2);
        console.log('-----------------------------------------------------------------')
        console.log(product)
        console.log('-----------------------------------------------------------------')
        return product;
      }



      return false;
      break;
    case 'RETURN':

      product.quantity = quantity.add(exit.quantity).toNumber();
      const newEntryTotal = value_unit.plus(exit.quantity).toNumber();
      product.value_total = value_total.add(newEntryTotal).toNumber().toFixed(2);
      product.value_unit = new Decimal(product.value_total).div(product.quantity).toNumber().toFixed(2);
      return product;

      break;
    default:
      break;
  }

}
