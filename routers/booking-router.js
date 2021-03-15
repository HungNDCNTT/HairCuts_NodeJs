let express = require('express');
const bodyParser = require('body-parser');

let router = express.Router();

let bookingController = require('../controllers/booking-controller');

/** create application/x-www-form-urlencoded parser */
let urlencodedParser = bodyParser.urlencoded({extended: false});

/**
 * API
 * Method GET
 * Get booking in web
 **/

router.get('/bookings', bookingController.getBooking);

/**
 * API
 * Method GET
 * Get booking in API
 **/

router.get('/api/bookings', bookingController.getBookingApi);

/**
 * API
 * Method POST
 * Add booking
 **/

router.post('/bookings/add', urlencodedParser, bookingController.insertBooking);

/**
 * API
 * Method POST
 * Edit Booking
 **/

router.post('/bookings/edit', urlencodedParser, bookingController.editBooking);

/**
 * API
 * Method POST
 * Remove Booking
 **/

router.post('/bookings/remove', urlencodedParser, bookingController.removeBooking);

module.exports = router;