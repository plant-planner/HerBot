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
        type: String,
        enum: ["low", "medium", "high", "very high"]
        
    },
    lightNeed: {
        type: String,
        enum: ["low", "medium", "high", "very high"]

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
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Herb = mongoose.model("Herb", herbSchema);

module.exports = Herb;