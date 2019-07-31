const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Here we set up our Models with Schema
const herbSchema = new Schema({
    commonName: {
        type: String,
        required: [true, "Enter the common name"]
    },
    latinName: {
        type: String,
        required: [true, "Enter the latin name"]
    },
    image: {
        type: String,
        default: ""// DEFAULT PICTURE MISSING
    },
    description: {
        type: String,
    },
    waterNeed: {
        type: Number,
        
    },
    lightNeed: {
        type: Number,

    },
    temperature: {
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
        optimal: {
            type: Number,
        }
    },
    season: {
        start: {
            type: Number,
        },
        end: {
            type: Number,
        }
    },
    inside: {
        type: Boolean,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    // created: {
    //     type: Date,
    //     default: Date.now
    // }
});

const Herb = mongoose.model("Herb", herbSchema);

module.exports = Herb;