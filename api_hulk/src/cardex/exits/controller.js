const exitsDAO = require("./dao");
const globalHooks = require("../../hooks/global.hooks");

module.exports = class exitsController {
  /* CRUD */

  static async create(req, reply) {
    try {

      const validItems = globalHooks.validateData(req.body, [
        "document",
        "quantity",
        "value_unit",
        "date",
        "types"
      ]);

      if (!validItems || !req.params.id || !validateItemsValues(req.body)) {
        return reply.status(400).send({ msg: "Document, Quantity, Value Unit,Types  and date is required or types is not soported, values actives (RETURN or EXIT)" });
      };

      const exits = await exitsDAO.findAndCreate(req.body, req.params.id);
      const validateExitsCreate = !exits ? { code: 400, msg: 'creation error' } : exits == 'exist' ? { code: 400, msg: 'exits alredy register' } : { code: 201, msg: 'created' };
      return reply.status(validateExitsCreate.code).send({ msg: validateExitsCreate.msg });

    } catch (error) {

      return reply.status(500).send();
    }
  }


  static async list(req, reply) {
    try {
      if (!req.params.id)
        return reply.status(400).send({ msg: "ID exits is required" });

      const exitss = await exitsDAO.list(req.params.id);
      if (!exitss) return reply.status(400).send();

      reply.status(200).send(exitss);
    } catch (error) {
      return reply.status(500).send();
    }
  }

  static async read(req, reply) {
    try {
      if (!req.params.id || !req.params.id_exit)
        return reply.status(400).send({ msg: "ID exits is required" });
      const exits = await exitsDAO.readOneId(req.params.id, req.params.id_exit);
      if (!exits) return reply.status(400).send();

      reply.status(200).send(exits);
    } catch (error) {

      return reply.code(500).send();
    }
  }

  static async update(req, reply) {
    try {
      if (!req.params.id || !req.body)
        return reply.status(400).send({ msg: "ID exits and new info is required" });


      const updateExits = await exitsDAO.update(req.body, req.params.id);

      if (!updateExits) return reply.status(400).send();
      reply.status(200).send({ mgs: 'update' });
    } catch (error) {

      return reply.code(500).send();
    }
  }
  static async delete(req, reply) {
    try {
      if (!req.params.id || !req.body || !req.body.name)
        return reply.status(400).send({ msg: "ID and name exits  is required" });

      const deleteOrDeactivateExits = await exitsDAO.deactivate(req.body.name, req.params.id);
      if (!deleteOrDeactivateExits) return reply.status(400).send();

      reply.status(200).send({ mgs: deleteOrDeactivateexits });
    } catch (error) {

      return reply.code(500).send();
    }
  }



}

const validateTypes = (key) => {
  switch (key) {
    case 'EXIT':
      return true
      break;
    case 'RETURN':
      return true
      break;
    default:
      return false
      break;
  }
}
const validateItemsValues = (obj) => {
  return validateTypes(obj.types) || obj.value_unit >= 0 && obj.quantity >= 0 ? true : false;
}