const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Here we set up our Models with Schema
const userSchema = new Schema({
    username: {
      type: String,
      required: [true, "You need to provide a username"]
    },
    password: {
      type: String,
      required: [true, "You need to have a password"]
    }
    });

module.exports = mongoose.model("User", userSchema)