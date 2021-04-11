const globalHooks = require("../../hooks/global.hooks");
let productBase = {
    name: null,
    reference: null,
    description: null,
    picture: null,
    quantity: null,
    value_unit: null
};

module.exports = class productDTO {
    static create(obj) {
        console.log(obj, 'nnnnn')
        productBase.name = obj.name;
        productBase.reference = obj.reference;
        productBase.description = obj.description ? obj.description : null;
        productBase.picture = obj.picture ? obj.picture : null;
        productBase.quantity = obj.quantity ? obj.quantity : 0;
        productBase.value_unit = obj.value_unit ? obj.value_unit : 0;

        return productBase;

    }
    static update(obj) {
        productBase.name = obj.name ? obj.name : null;
        productBase.reference = obj.reference ? obj.reference : null;
        productBase.description = obj.description ? obj.description : null;
        productBase.picture = obj.picture ? obj.picture : null;
        productBase = globalHooks.deleteNullValuesForObject(productBase);
        return productBase;

    }

}