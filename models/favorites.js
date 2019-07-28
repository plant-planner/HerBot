const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Here we set up our Models with Schema
const favoriteSchema = new Schema({
    //This is gonna be an array of ObjectIDs from Herbs 
    });

module.exports = mongoose.model("Favorite", favoriteSchema)