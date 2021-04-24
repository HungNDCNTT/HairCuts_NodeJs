const storage = require("node-sessionstorage");
const User = require("../models/user");
const md5 = require('md5');

//Login
module.exports.onLogin = (req, res) => {
    if (req.body.password.toString() == "admin" && req.body.email.toString() == "admin") {
        res.redirect('/home');
    }else {
        res.redirect('/login');
    }

    // User.findOne({email: req.body.email}, function (err, user) {

    // console.log();
    // if (err) {
    //     console.log(err);
    // }
    // if (!user) {
    //     console.log("Wrong account information");
    // } else {
    //     if (req.body.password.localeCompare(user.password) == 1) {
    //         console.log("Incorrect password");
    //     } else if (!user.isAdmin) {
    //         console.log("You are not admin");
    //     } else {
    //         console.log(req.body.password);
    //         console.log(user.email);
    //         console.log(user.password);
    //         console.log("welcome " + user.email);
    //         res.redirect('/home');
    //     }
    // }
    // })
};

//Api Login
module.exports.onLoginApi = (req, res) => {
    let post_data = req.body;
    let email = post_data.email;
    let password = post_data.password;
    User.findOne({
        email: email,
    }, function (err, user) {
        if (err) {
            res.json(user);
        }
        if (!user) {
            res.status(404).json(user)
        } else {
            if (password.localeCompare(user.password) == 1) {
                res.status(401).json(user)
            } else {
                req.tokens = [];
                user.tokens = [];
                let token = user.generateAuthToken();
                console.log("Login Token: " + token)
                User.findByIdAndUpdate(req.body._id, {
                        uuid: req.body.uuid,
                        avatar_link: req.body.avatar_link,
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        phone: req.body.phone,
                        isAdmin: req.body.isAdmin,
                        date_of_birth: req.body.date_of_birth,
                        address: req.body.address,
                        tokens: token,
                    },
                )
                res.status(200).json(user);
            }
        }
    })
}

//Api Register
module.exports.onRegisterApi = (req, res, next) => {
    // Create an instance of model SomeModel
    //Validate register form
    let user = new User({
        uuid: req.body.uuid,
        avatar_link: req.body.avatar_link,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
    });

    // Save the new model instance, passing a callback
    user.save(function (err) {
            console.log(err);
            if (err) {
                res.status(500).json({message: err.toString()});
                return null;
            } else {
                res.status(200).json({message: 'Register successfully !'});
            }
        }
    )
    ;
}

//Register
module.exports.onRegister = (req, res, next) => {
    // Create an instance of model SomeModel
    //Validate register form
    let user = new User({
        uuid: req.body.uuid,
        avatar_link: req.body.avatar_link,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
    });

    // Save the new model instance, passing a callback
    user.save(function (err) {
        console.log(err);
        if (err) {
            console.log(err);
            res.status(500).json({message: 'Register Failure !'});
            return;
        } else {
            res.status(200).json({message: 'Register successfully !'});
        }
        console.log('Success');
        res.redirect('/login');
    });
}
