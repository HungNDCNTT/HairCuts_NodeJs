const express = require('express');
const bodyParser = require('body-parser');

let router = express.Router();

let authenticationController = require('../controllers/authentication-controller');

let urlencodedParser = bodyParser.urlencoded({extended: false});

/**
 * POST
 * Login
 */
router.post('/login', urlencodedParser, authenticationController.onLogin);

/**
 * POST
 * Register
 */
router.post('/register', urlencodedParser, authenticationController.onRegister);

/**
 * API
 * POST
 * Login
*/
router.post('/api/login', urlencodedParser, authenticationController.onLoginApi);

/**
 * API
 * POST
 * Register
 */
router.post('/api/register', urlencodedParser, authenticationController.onRegisterApi);

module.exports = router;
