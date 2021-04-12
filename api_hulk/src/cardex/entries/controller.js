const entriesDAO = require("./dao");
const globalHooks = require("../../hooks/global.hooks");

module.exports = class entriesController {
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
        return reply.status(400).send({ msg: "Document, Quantity, Value Unit,Types  and date is required or types is no soported values actives (RETURN or ENTRI)" });
      };

      const entries = await entriesDAO.findAndCreate(req.body, req.params.id);
      const validateEntriesCreate = !entries ? { code: 400, msg: 'creation error' } : entries == 'exist' ? { code: 400, msg: 'entries alredy register' } : { code: 201, msg: 'created' };
      return reply.status(validateEntriesCreate.code).send({ msg: validateEntriesCreate.msg });

    } catch (error) {

      return reply.status(500).send();
    }
  }
  static async list(req, reply) {
    try {
      if (!req.params.id)
        return reply.status(400).send({ msg: "ID entries is required" });

      const entriess = await entriesDAO.list(req.params.id);
      if (!entriess) return reply.status(400).send();

      reply.status(200).send(entriess);
    } catch (error) {
      return reply.status(500).send();
    }
  }

  static async read(req, reply) {
    try {
      if (!req.params.id || !req.params.id_entrie)
        return reply.status(400).send({ msg: "ID entries is required" });
      const entries = await entriesDAO.readOneId(req.params.id, req.params.id_entrie);
      if (!entries) return reply.status(400).send();

      reply.status(200).send(entries);
    } catch (error) {

      return reply.code(500).send();
    }
  }

  static async update(req, reply) {
    try {
      if (!req.params.id || !req.body)
        return reply.status(400).send({ msg: "ID entries and new info is required" });


      const updateentries = await entriesDAO.update(req.body, req.params.id);

      if (!updateentries) return reply.status(400).send();
      reply.status(200).send({ mgs: 'update' });
    } catch (error) {

      return reply.code(500).send();
    }
  }
  static async delete(req, reply) {
    try {
      if (!req.params.id || !req.body || !req.body.name)
        return reply.status(400).send({ msg: "ID and name entries  is required" });

      const deleteOrDeactivateentries = await entriesDAO.deactivate(req.body.name, req.params.id);
      if (!deleteOrDeactivateentries) return reply.status(400).send();

      reply.status(200).send({ mgs: deleteOrDeactivateentries });
    } catch (error) {

      return reply.code(500).send();
    }
  }



}


const validateTypes = (key) => {
  switch (key) {
    case 'ENTRIE':
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
  return validateTypes(obj.types) && obj.value_unit >= 0 && obj.quantity >= 0 ? true : false;
}