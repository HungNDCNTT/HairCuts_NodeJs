let express = require('express');
const bodyParser = require('body-parser');

let router = express.Router();

let dresserController = require('../controllers/hair-dresser-controller');
/** create application/x-www-form-urlencoded parser */
let urlencodedParser = bodyParser.urlencoded({extended: false});


/**
 * API
 * Method GET
 * Get All dresser
 **/

router.get('/api/hairDresser/getAll', dresserController.getAllDresser);

/**
 * Web
 * Method GET
 * Get All dresser Web
 **/

router.get('/dressers', dresserController.getAllDresserWeb);

/**
 * API
 * Method POST
 * Get dresser by id
 **/

router.post('/api/hairDresser/getHairDresserById',urlencodedParser, dresserController.getDresserById);

/**
 * API
 * Method POST
 * add Dresser
 **/

router.post('/api/hairDresser/add',urlencodedParser, dresserController.addHairDresser);

/**
 * API
 * Method POST
 * Delete Dresser by ID
 **/

router.post('/api/hairDresser/deleteById',urlencodedParser, dresserController.deleteDresserById);

/**
 * API
 * Method POST
 * Update Comment by ID
 **/

router.post('/api/hairDresser/updateComment',urlencodedParser, dresserController.updateComment);

module.exports = router;