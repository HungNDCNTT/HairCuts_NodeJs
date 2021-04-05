const mongoose = require('mongoose');
const detailsSchema = new mongoose.Schema({
    detail_id: {
        type: String,
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
            },
            user_comment: [
                {
                    comment: {
                        type: String,
                    }
                }
            ],
        }
    ],
    rate: {
        type: String,
    }
});

//Export model
module.exports = mongoose.model('details', detailsSchema);