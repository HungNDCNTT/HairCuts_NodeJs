const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    image_link1: {
        type: String,
    },
    image_link2: {
        type: String,
    },
    image_link3: {
        type: String,
    },
    image_link4: {
        type: String,
    },
    image_link5: {
        type: String,
    },
});

module.exports = mongoose.model('image', imageSchema);