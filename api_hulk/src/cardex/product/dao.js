
const productDTO = require("./dto");
const entriesModel = require("../exits/model");
const existDAO = require("../exits/dao");
const mongoose = require('mongoose');
const Decimal = require('decimal.js-light');
const exitsModel = require("../exits/model");
const productModel = require('./model')
module.exports = class productDAO {

  static async findAndCreate(obj) {
    try {
      const formatProductData = await productDTO.create(obj);
      console.log(formatProductData)

      const productCreated = await productModel.findOne({ $or: [{ name: formatProductData.name }, { reference: formatProductData.reference }] }) ? 'exist' : await productModel.create(formatProductData);
      console.log(productCreated)
      return productCreated;

    } catch (error) {
      console.log(error, 'error dao product');
      return false;

    }
  }
  static async list() {
    try {
      const listProducts = await productModel.find({}, { '__v': 0, exits: 0, entries: 0 });
      return listProducts;
    } catch (error) {
      return false;
    }
  }
  static async readById(id) {
    try {
      const oneProduct = await productModel.findById(id, { '__v': 0 }).populate('entries').populate('exits');
      return oneProduct ? oneProduct : {};

    } catch (error) {
      console.log(error)
      return false;
    }
  }
  static async update(obj, id) {
    try {
      const updateDataFormatProductUpdate = await productDTO.update(obj);
      console.log(updateDataFormatProductUpdate, '-----------')
      const updateProduct = await productModel.findByIdAndUpdate(id, updateDataFormatProductUpdate);
      return updateProduct;

    } catch (error) {
      console.log(error)
      return false;
    }
  }
  static async updatePictureProduct(picture, id) {
    try {

      const updateProduct = await productModel.findByIdAndUpdate(id, { picture });
      return updateProduct;

    } catch (error) {
      console.log(error)
      return false;
    }
  }
 /* static async deactivate(name, id) {
    try {
      const productExistend = await productModel.findById(id);
      let msg = 'delete';
      if (productExistend.entries && productExistend.entries.length ||
        productExistend.exits && productExistend.exits.length) {
        await productModel.findOneAndUpdate({ name, _id: id }, { status: false });
        msg = 'deactivate';
      } else {
        await productModel.findByIdAndDelete(id)
      }

      return msg;

    } catch (error) {
      return false;
    }
  }*/
  static async entriesInProduct(entrie, product_id) {
    try {
      console.log('entreeee')
      let updateProduct = await productModel.findById(product_id);
      console.log(updateProduct, 'sistemass products1');
      const updateProductCalculate = await entriesIngresOrReturns(entrie, updateProduct);
      if (!updateProductCalculate) {
        return false;
      }


      updateProductCalculate.entries.push(entrie._id);
     

      const saveProduct = await updateProductCalculate.save();
      console.log(saveProduct, 'sistemass products2')
     
      return saveProduct;


    } catch (error) {
      console.log(error, 'error entrie')
      return false;
    }
  }
  
 


}
const entriesIngresOrReturns = (entrie, product) => {
  switch (entrie.types) {
    case 'ENTRIE':
      console.log(entrie.value_total, product.value_total, 'pase flaot----------------------')
      product.quantity = entrie.quantity + product.quantity;
      product.value_total = (entrie.value_total + product.value_total).toFixed(2);
      product.value_unit = (product.value_total / product.quantity).toFixed(2);

      return product;
      break;
    case 'RETURN':
      if (product.quantity >= entrie.quantity) {
        product.quantity = product.quantity - entrie.quantity;
        const newEntryTotal = product.value_unit * entrie.quantity;
        product.value_total = (product.value_total - newEntryTotal).toFixed(2);
        product.value_unit = (product.value_total / product.quantity).toFixed(2);
        return product;
      }
      return false;
      break;
    default:
      break;
  }

}

