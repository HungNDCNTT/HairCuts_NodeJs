const mongoose = require('mongoose');
const TokenGenerator = require('uuid-token-generator');
const genToken = new TokenGenerator(256, TokenGenerator.BASE62);
let post_id = genToken.generate();
const detailsSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    post_id: {
        type: String,
        default: post_id,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    titles: {
        type: String,
        default:"",
    },
    content: {
        type: String,
        default:"",
    },
    linksHD: {
        type: String,
        default:"",
    },
    comments: [
        {
            user_id: {
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
module.exports = mongoose.model('details', detailsSchema);