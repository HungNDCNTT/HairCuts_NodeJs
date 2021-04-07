const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    image_id: {
        type: String,
        default:"",
    },
    image_link1: {
        type: String,
        default:"",
    },
    image_link2: {
        type: String,
        default:"",
    },
    image_link3: {
        type: String,
        default:"",
    },
    image_link4: {
        type: String,
        default:"",
    },
    image_link5: {
        type: String,
        default:"",
    },
});

module.exports = mongoose.model('image', imageSchema);