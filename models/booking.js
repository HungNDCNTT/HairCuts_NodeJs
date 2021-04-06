const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customer_id: {
        type: String,
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    services: [{
        service: {
            type: String,
        }
    }],
    price: {
        type: Number,
    },
    status: {
        type: String,
    },
    times: {
        type: String,
    },
});

//Export model
module.exports = mongoose.model('booking', bookingSchema);