const mongoose = require('mongoose');
const TokenGenerator = require('uuid-token-generator');
const genToken = new TokenGenerator(256, TokenGenerator.BASE62);
let customerId = genToken.generate();
const bookingSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        default:customerId,
    },
    name: {
        type: String,
        default:"",
    },
    phone: {
        type: String,
        default:"",
    },
    services: [{
        service: {
            type: String,
            default:"",
        }
    }],
    price: {
        type: Number,
        default:0,
    },
    status: {
        type: String,
        default:"",
    },
    times: {
        type: String,
        default:"",
    },
});

//Export model
module.exports = mongoose.model('booking', bookingSchema);