
const productDTO = require("./dto");
const productModel = require("./model");
const mongoose = require('mongoose');
const Decimal = require('decimal.js-light');
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
      const listProducts = await productModel.find({}, { '__v': 0 });
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
  static async deactivate(name, id) {
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
  }
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
  static async exitsInProduct(exit, product_id) {
    try {
      console.log('----', exit, product_id)
      let updateProduct = await productModel.findById(product_id);
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

  static async search(obj) {
    try {
      /**console.log(obj, '..')
       const serachResults = await productModel.find({
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