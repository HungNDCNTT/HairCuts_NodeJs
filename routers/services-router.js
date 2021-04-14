let express = require('express');
const bodyParser = require('body-parser');

let router = express.Router();

let serviceController = require('../controllers/services-controller');
/** create application/x-www-form-urlencoded parser */
let urlencodedParser = bodyParser.urlencoded({extended: false});


/**
 * API
 * Method GET
 * Get All Service api
 **/

router.get('/api/services/getAll', serviceController.getAllServices);

/**
 * API
 * Method GET
 * Get All Service Web
 **/

router.get('/services/getAll', serviceController.getAllServiceWeb);

/**
 * API
 * Method POST
 * Get detail by id api
 **/

router.post('/api/services/getServiceById',urlencodedParser, serviceController.getServicesById);

/**
 * API
 * Method POST
 * Get detail by id web
 **/

router.post('services/getServiceById',urlencodedParser, serviceController.getServicesByIdWeb);

/**
 * API
 * Method POST
 * add service api
 **/

router.post('/api/services/add',urlencodedParser, serviceController.addService);

/**
 * API
 * Method POST
 * add service web
 **/

router.post('/services/add',urlencodedParser, serviceController.addServiceWeb);

/**
 * API
 * Method POST
 * Delete service by ID api
 **/

router.post('/api/services/deleteById',urlencodedParser, serviceController.removeService);

/**
 * API
 * Method POST
 * Delete service by ID web
 **/

router.post('/services/deleteById',urlencodedParser, serviceController.removeServiceWeb);

/**
 * API
 * Method POST
 * Update service by ID api
 **/

router.post('/api/services/updateService',urlencodedParser, serviceController.updateServiceApi);

/**
 * API
 * Method POST
 * Update service by ID web
 **/

router.post('/services/updateService',urlencodedParser, serviceController.updateServiceWeb);

module.exports = router;