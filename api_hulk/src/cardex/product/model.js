const mongoose = require("mongoose");


const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 4,
      maxLength: 40,

      require: true
    },
    reference: {
      type: String,
      unique: true,
      trim: true,
      minLength: 4,
      maxLength: 20,
    },
    description: {
      type: String,
      maxLength: 200,
      trim: true
    },
    picture: {
      type: String,
      trim: true
    },
    unit_of_measure: {
      type: Number,
      trim: true,
      default: 1
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
    entries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entries"
      }
    ],
    exits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exits"
      }
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", schema, "product");
