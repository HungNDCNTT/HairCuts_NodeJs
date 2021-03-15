const mongoose = require('mongoose');
const crypto = require('crypto');
const TokenGenerator = require('uuid-token-generator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    isAdmin: Boolean,
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false,
        default: "Hanoi"
    },
    name: {
        type: String,
        required: false
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
}, {
    strict: false
});

let genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex').slice(0, length);
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    // const token = jwt.sign({
    //     _id: user._id.toString(),
    //     isAdmin: this.isAdmin,
    //     expiresIn: "7 days"
    // });
    user.tokens = [];
    const genToken = new TokenGenerator(256, TokenGenerator.BASE62);
    let token = genToken.generate();

    console.log("Token: " + token);
    user.tokens = user.tokens.concat({token});
    // user.tokens = token.toString();
    await user.save();
    return token;
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