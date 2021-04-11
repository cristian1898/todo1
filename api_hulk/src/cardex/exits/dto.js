
let exitsBase = {
    document: null,
    quantity: null,
    value_unit: null,
    value_total: null,
    date: null,
    types: null
};

module.exports = class exitsDTO {
    static create(obj) {
        console.log(obj, 'nnnnn')
        exitsBase.document = obj.document;
        exitsBase.quantity = obj.quantity;
        exitsBase.value_unit = obj.value_unit;
        exitsBase.date = obj.date;
        exitsBase.types = obj.types;

        return exitsBase;

    }

}