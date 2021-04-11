const globalHooks = require("../../hooks/global.hooks");
let entriesBase = {
    document: null,
    quantity: null,
    value_unit: null,
    value_total: null,
    date: null,
    types: null
};

module.exports = class entriesDTO {
    static create(obj) {
        console.log(obj, 'nnnnn')
        entriesBase.document = obj.document;
        entriesBase.quantity = obj.quantity;
        entriesBase.value_unit = obj.value_unit;
        entriesBase.date = obj.date;
        entriesBase.types = obj.types;

        return entriesBase;

    }

}