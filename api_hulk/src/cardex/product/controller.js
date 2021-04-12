const productDAO = require("./dao");
const globalHooks = require("../../hooks/global.hooks");
const fs = require('fs')
const util = require('util')
const path = require('path')
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)
module.exports = class productController {
  constructor() {

  }
  /* CRUD */

  static async create(req, reply) {
    try {

      const validItems = globalHooks.validateData(req.body, [
        "name",
        "reference"
      ]);

      if (!validItems) {
        return reply.status(400).send({ msg: "Name  and reference is required" });
      };

      const product = await productDAO.findAndCreate(req.body);
      const validateProductCreate = product == 'exist' ? { code: 400, msg: 'Product alredy register' } : { code: 200, msg: 'Create product' };
      return reply.status(validateProductCreate.code).send({ mgs: validateProductCreate.msg });

    } catch (error) {

      return reply.status(500).send();
    }
  }
  static async list(req, reply) {
    try {
      const products = await productDAO.list();
      if (!products) return reply.status(400).send();

      reply.status(200).send(products);
    } catch (error) {
      return reply.status(500).send();
    }
  }

  static async read(req, reply) {
    try {
      if (!req.params.id)
        return reply.status(400).send({ msg: "ID product is required" });
      const product = await productDAO.readById(req.params.id);
      if (!product) return reply.status(400).send({ msg: 'Read error' });

      reply.status(200).send(product);
    } catch (error) {

      return reply.code(500).send();
    }
  }

  static async update(req, reply) {
    try {
      if (!req.params.id || !req.body)
        return reply.status(400).send({ msg: "ID product and new info is required" });


      const updateProduct = await productDAO.update(req.body, req.params.id);

      if (!updateProduct) return reply.status(400).send({ msg: 'Error update' });
      reply.status(200).send({ msg: 'update' });
    } catch (error) {

      return reply.code(500).send();
    }
  }
  static async delete(req, reply) {
    try {
      if (!req.params.id || !req.body || !req.body.name)
        return reply.status(400).send({ msg: "ID and name product  is required" });

      const deleteOrDeactivateProduct = await productDAO.deactivate(req.body.name, req.params.id);
      if (!deleteOrDeactivateProduct) return reply.status(400).send();

      reply.status(200).send({ mgs: deleteOrDeactivateProduct });
    } catch (error) {

      return reply.code(500).send();
    }
  }

  static async uploadPictureByIdProduct(req, reply) {
    try {

      const data = await req.file({ limits: { fileSize: 170000 } });
      const fileTypes = /jpeg|jpg|png|gif/;

      if (!data || !data.filename || !fileTypes.test(data.mimetype))
        return reply.status(400).send({ msg: "Img required or format ivalid" });

      const name = path.join(__dirname, '../../../public/') + req.params.id + '.png';
      await pump(data.file, fs.createWriteStream(name));

      await productDAO.updatePictureProduct(req.params.id + '.png', req.params.id);


      reply.status(201).send({ msg: 'update picture' });

    } catch (error) {
      return reply.code(500).send();
    }
  }

}

