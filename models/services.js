const mongoose = require('mongoose');
const TokenGenerator = require('uuid-token-generator');
const genToken = new TokenGenerator(256, TokenGenerator.BASE62);
let serviceId = genToken.generate();
const servicesSchema = new mongoose.Schema({
    id: {
        type: String,
        default:"",
    },
    service_name: {
        type: String,
        default:"",
    },
    service_price: {
        type: String,
        default:"",
    },
    estimate_times: {
        type: String,
        default:"",
    },
});

//Export model
module.exports = mongoose.model('services', servicesSchema);