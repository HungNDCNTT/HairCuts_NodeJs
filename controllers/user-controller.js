let User = require('../models/user');

/**
 * API
 * Method GET
 * Get User in web
 */

module.exports.getUser = function (req, res, next) {
    User.find({}, function (err, users) {
        res.render('user', {
            title: 'Manager User',
            users: users
        });
    });
};

/**
 * API
 * Method POST
 * Edit user in web
 */

module.exports.editUser = function (req, res, next) {
    console.log(req.body.uid);
    User.findOneAndUpdate({
            _id: req.body.uid
        }, {
            $set: {
                // image: req.body.image,
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                updateAt: Date.now()
            }
        }, {
            returnNewDocument: true,
            new: true,
            strict: false
        },
        function (err, num) {
            res.redirect('/user')
        });
};

/**
 * API
 * Method: POST
 * Edit user in API
 */
module.exports.editUserApi = function (req, res, next) {
    User.findOneAndUpdate({
        _id: req.body._id
    }, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            updateAt: Date.now()
        }
    }, {
        returnNewDocument: true,
        new: true,
        strict: false
    }, function (err, num) {
        if (err) {
            res.status(404).json({
                message: "Something went wrong!"
            });
        }
        res.status(200).json({
            message: "Update user successful !"
        });
    });
}

/**
 * API
 * Method POST
 * Remove User
 */

module.exports.removeUser = function (req, res, next) {
    console.log(req.body.pid);
    User.findByIdAndRemove(req.body.pid,
        function (err) {
            res.redirect('/user');
        }
    )
};

/**
 * API
 * Method GET
 * Get All User Api
 **/

module.exports.getAllUser = function (req, res, next) {
    User.find({}, function (err, users) {
        let result = [];
        res.setHeader('Content-Type', 'application/json');
        users.forEach(user => {
            result.push({
                email: user.email,
                password: user.password,
                createdAt: user.createdAt,
                isAdmin: user.isAdmin,
                phone: user.phone,
                address: user.address,
                name: user.name,
                tokens: user.tokens
            });
        });
        res.send(JSON.stringify(result));
    });
};
