let express = require('express');
const bodyParser = require('body-parser');

let router = express.Router();

let userController = require('../controllers/user-controller');

/** create application/x-www-form-urlencoded parser */
let urlencodedParser = bodyParser.urlencoded({
    extended: false
});

/**
 * API
 * Method GET
 * Get User in web
 **/

router.get('/user', userController.getUser);

/**
 * API
 * Method POST
 * Edit user in web
 **/

router.post('/user/edit', urlencodedParser, userController.editUser);

/**
 * API
 * Method: POST
 * Edit user API
 */
router.post('/api/user/update', urlencodedParser, userController.updateUserApi);

/**
 * API
 * Method POST
 * Remove User in web
 **/

router.post('/user/remove', urlencodedParser, userController.removeUser);

/**
 * API
 * Method GET
 * Get All User API
 **/

router.get('/api/user/getAllUser', urlencodedParser, userController.getAllUser);

/**
 * API
 * Method POST
 * Remove User in web
 **/

router.post('/api/user/findUserById', urlencodedParser, userController.findUserById);

module.exports = router;