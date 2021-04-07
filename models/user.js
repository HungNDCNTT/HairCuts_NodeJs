const mongoose = require('mongoose');
const crypto = require('crypto');
const TokenGenerator = require('uuid-token-generator');
const genToken = new TokenGenerator(256, TokenGenerator.BASE62);
let token = genToken.generate();
let uuid = require('uuid');
const userSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    uuid: {
        type: String,
        trim: true,
        default: uuid.v4(),
    },
    avatar_link: {
        type: String,
        default:"",
    },
    name: {
        type: String,
        default:"",
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        default:"",
    },
    password: {
        type: String,
        trim: true,
        default:"",
    },
    phone: {
        type: String,
        required: false,
        default:"",
    },
    date_of_birth: {
        type: String,
        default:Date.now(),
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
    address: {
        type: String,
        default:"",
    },
    tokens: {
        type: String,
        default: token,
    }
});

let genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex').slice(0, length);
}

let sha512 = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        password: value
    }
}

userSchema.methods.saltHashPassword = function (password) {
    let salt = genRandomString(16); //Create 16 random characters
    return sha512(password, salt);
}

userSchema.methods.checkHashPassword = function (password, salt) {
    return passwordData = sha512(password, salt);
}

//Export model
module.exports = mongoose.model('user', userSchema);