const mongoose = require('mongoose');
let uuid = require('uuid');
const detailsSchema = new mongoose.Schema({
    post_id: {
        type: String,
        default: uuid.v1(),
    },
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
    comments: [
        {
            user_id: {
                type: String,
                default: uuid.v4(),
            },
            comment: {
                type: String,
            },
        }
    ],
    rate: {
        type: String,
    }
});

//Export model
module.exports = mongoose.model('details', detailsSchema);