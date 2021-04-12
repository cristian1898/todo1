const mongoose = require("mongoose");


const schema = new mongoose.Schema(
    {
        document: {
            type: String,
            trim: true,
            require: true
        },

        quantity: {
            type: Number,
            trim: true,
            require: true
        },

        value_unit: {
            type: Number,
            trim: true,
            require: true,
            default: 0
        },
        value_total: {
            type: Number,
            trim: true,
            default: 0
        },

        date: {
            type: Date,
            default: Date.now
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        types: {
            type: String,
            enum: ['EXIT', 'RETURN'],
            required: true
        },
        assigne:{
            type: String,
            default:'exits'
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Exits", schema, "exits");