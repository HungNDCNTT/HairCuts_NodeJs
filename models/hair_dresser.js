const mongoose = require('mongoose');
let uuid = require('uuid');
const hairDresserSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    hair_dress_id: {
        type: String,
        default: uuid.v1(),
    },
    dress_title: {
        type: String,
    },
    content: {
        type: String,
    },
    link_avt: {
        type: String,
    },
    comments: [
        {
            uuid: {
                type: String,
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
module.exports = mongoose.model('hair_dresser', hairDresserSchema);