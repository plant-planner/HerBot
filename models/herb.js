const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Here we set up our Models with Schema
const herbSchema = new Schema({
    title: {
      type: String,
      required: [true, "You need to give your Herb a title"],
    }
    });

module.exports = mongoose.model("Herb", herbSchema)