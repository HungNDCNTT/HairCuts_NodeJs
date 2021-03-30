let express = require('express');
const bodyParser = require('body-parser');

let imageRouter = express.Router();

let imageController = require('../controllers/image-controller');
/** create application/x-www-form-urlencoded parser */
let urlencodedParser = bodyParser.urlencoded({extended: false});

/**
 * API
 * Method POST
 * Add Image
 **/

imageRouter.post('/image/add', urlencodedParser, imageController.addImage);

/**
 * API
 * Method GET
 * Get all images
 **/

imageRouter.get('/image/getAll', imageController.getAllImage);

module.exports = imageRouter;