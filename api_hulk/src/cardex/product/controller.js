const productDAO = require("./dao");
const globalHooks = require("../../hooks/global.hooks");

module.exports = class productController {
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
      const validateProductCreate = product == 'exist' ? { code: 400, msg: 'Product alredy register' } : { code: 201, mgs: 'created' };
      return reply.status(validateProductCreate.code).send({ mgs: validateProductCreate.msg });

    } catch (error) {
      console.log(error)
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
      if (!product) return reply.status(400).send();

      reply.status(200).send(product);
    } catch (error) {
      console.log(error, 'controller----')
      return reply.code(500).send();
    }
  }

  static async update(req, reply) {
    try {
      if (!req.params.id || !req.body)
        return reply.status(400).send({ msg: "ID product and new info is required" });


      const updateProduct = await productDAO.update(req.body, req.params.id);
      console.log(updateProduct, 'update')
      if (!updateProduct) return reply.status(400).send();
      reply.status(200).send({ mgs: 'update' });
    } catch (error) {
      console.log(error, 'controller-update----')
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
      console.log(error, 'ee')
      return reply.code(500).send();
    }
  }

  /*END CRUD*/

  /* SEARCH 
  static async search(req, reply) {
    try {
      /*
            if (
              !req.query
            ) {
              return reply.status(200).send();
            }
            const query = req.query;
            const obj = {
              name: query.name ? query.name : null,
              email: query.email ? query.email : null,
              phone: query.phone ? query.phone : null,
              order: query.order && query.order == 'true' ? true : false,
              limit: query.limit ? query.limit : null,
      
            }
            const searchproduct = await productDAO.search(obj);
      
            reply.status(200).send(searchproduct);
    } catch (error) {
      return reply.code(500).send();
    }
  }
  /* SEARCH */

}

