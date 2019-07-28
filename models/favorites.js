const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Here we set up our Models with Schema
const favoriteSchema = new Schema({
    favorites: [ ],
    });

module.exports = mongoose.model("Favorite", favoriteSchema)