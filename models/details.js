const mongoose = require('mongoose');
let date = Date.now();
const detailsSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
    },
    titles: {
        type: String,
    },
    content: {
        type: String,
    },
    linksHD: {
        type: String,
    },
});

//Export model
module.exports = mongoose.model('details', detailsSchema);