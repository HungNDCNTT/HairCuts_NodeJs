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
module.exports.updateUserApi = function (req, res, next) {
    User.findOneAndUpdate({
        _id: req.body.user_id
    }, {
        $set: {
            uuid: req.body.uuid,
            avatar_link: req.body.avatar_link,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            date_of_birth: req.body.date_of_birth,
            address: req.body.address,
        }
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
                uuid: user.uuid,
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

/**
 * API
 * Method POST
 * find user by id
 **/

module.exports.findUserById = function (req, res, next) {
    User.find({uuid: req.body.user_id}, function (err, userById) {
        let userItems = [];
        res.setHeader('Content-Type', 'application/json');
        userById.forEach(userId => {
            userItems.push({
                uuid: userId.uuid,
                avatar_link: userId.avatar_link,
                name: userId.name,
                email: userId.email,
                password: userId.password,
                phone: userId.phone,
                isAdmin: userId.isAdmin,
                date_of_birth: userId.date_of_birth,
                address: userId.address,
            });
        });
        res.send(JSON.stringify(userItems));
    });
};
