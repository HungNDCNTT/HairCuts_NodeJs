const storage = require("node-sessionstorage");
const User = require("../models/user");
const md5 = require('md5');

//Login
module.exports.onLogin = (req, res) => {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            console.log("Wrong account information");
        } else {
            if (req.body.password.localeCompare(user.password) == 1) {
                console.log("Incorrect password");
            } else if (!user.isAdmin) {
                console.log("You are not admin");
            } else {
                let token = user.generateAuthToken()
                console.log(req.body.password);
                console.log(user.email);
                console.log(user.password);
                console.log("welcome " + user.email);
                storage.setItem("email", user.email);
                storage.setItem("tokens", token);
                res.redirect('/home');
            }
        }
    })
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
                        createdAt: req.body.createdAt,
                        address: req.body.address,
                        email: req.body.email,
                        password: req.body.password,
                        isAdmin: req.body.isAdmin,
                        name: req.body.name,
                        phone: req.body.phone,
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
    let post_data = req.body;
    let email = post_data.email;
    let password = post_data.password;
    let user = new User({
        email: email,
        password: password,
        isAdmin: false,
        name: "",
        phone: ""
    });

    // Save the new model instance, passing a callback
    user.save(function (err) {
        console.log(err);
        //   if (err) return handleError(err);
        res.status(200).json({message: 'Register successfully !'});
    });
}

//Register
module.exports.onRegister = (req, res, next) => {
    // Create an instance of model SomeModel
    //Validate register form
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        isAdmin: true,
        name: "HungND",
        phone: "",
    });

    // Save the new model instance, passing a callback
    user.save(function (err) {
        console.log(err);
        if (err) {
            console.log(err);
            return;
        }
        console.log('Success');
        res.redirect('/login');
    });
}
