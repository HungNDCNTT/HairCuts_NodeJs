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

imageRouter.post('/api/image/add', urlencodedParser, imageController.addImage);

/**
 * API
 * Method GET
 * Get all images
 **/

imageRouter.get('/api/image/getAll', imageController.getAllImage);

/**
 * API
 * Method POST
 * Delete image by ID
 **/

imageRouter.post('/api/image/deleteById',urlencodedParser, imageController.deleteImageById);

module.exports = imageRouter;