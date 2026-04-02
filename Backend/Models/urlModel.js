const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    urls: {
        type: [String],
        required: true
    },
    source: {
        type: String,
        default: "file"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Url", urlSchema);