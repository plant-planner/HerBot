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
        require: [true, "Add the amount of needed water"]
    },
    lightNeed: {
        type: Number,
        require: [true, "Add the amount of needed light"]
    },
    temperature: {
        min: {
            type: Number,
            required: [true, "Add minimum temperature"]
        },
        max: {
            type: Number,
            required: [true, "Add maximum temperature"]
        },
        optimal: {
            type: Number,
            required: [true, "Add a optimum temperature"]
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
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Herb = mongoose.model("Herb", herbSchema);

module.exports = Herb;