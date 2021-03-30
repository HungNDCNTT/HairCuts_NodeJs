const mongoose = require('mongoose');
let date = Date.now();
const detailsSchema = new mongoose.Schema({
    date: {
        type: String,
        default: date,
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