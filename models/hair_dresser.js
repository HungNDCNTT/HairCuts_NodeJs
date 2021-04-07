const mongoose = require('mongoose');
const TokenGenerator = require('uuid-token-generator');
const genToken = new TokenGenerator(256, TokenGenerator.BASE62);
let dresserId = genToken.generate();
const hairDresserSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    hair_dress_id: {
        type: String,
        default:dresserId,
    },
    dress_title: {
        type: String,
        default:"",
    },
    content: {
        type: String,
        default:"",
    },
    link_avt: {
        type: String,
        default:"",
    },
    comments: [
        {
            uuid: {
                type: String,
                default:"",
            },
            comment: {
                type: String,
                default:"",
            },
        }
    ],
    rate: {
        type: String,
        default:"",
    }
});

//Export model
module.exports = mongoose.model('hair_dresser', hairDresserSchema);