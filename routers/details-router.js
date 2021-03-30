let express = require('express');
const bodyParser = require('body-parser');

let router = express.Router();

let detailsController = require('../controllers/details-controller');
/** create application/x-www-form-urlencoded parser */
let urlencodedParser = bodyParser.urlencoded({extended: false});


/**
 * API
 * Method GET
 * Get All detail
 **/

router.get('/api/detail/getAll', detailsController.getAllDetail);

/**
 * API
 * Method POST
 * Get detail by id
 **/

router.post('/api/detail/getDetailById',urlencodedParser, detailsController.getDetailsById);

/**
 * API
 * Method POST
 * add detail
 **/

router.post('/api/detail/add',urlencodedParser, detailsController.addDetail);

module.exports = router;