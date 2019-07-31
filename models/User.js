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
    },
    favorites: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'herbs' 
    }]

    },
    {timestamps: true
    }, {
      collection: "users"
    });

module.exports = mongoose.model("User", userSchema)