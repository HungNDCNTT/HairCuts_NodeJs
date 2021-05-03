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
router.get('/api/bookingNow', bookingController.getBookingNow);

router.post('/api/bookingsById',urlencodedParser, bookingController.getDetailsById);

router.post('/api/bookingsByIdddd',urlencodedParser, bookingController.getDetailsByIdddd);

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

router.post('editBooking', urlencodedParser, bookingController.editBooking);


router.post('/api/updateRateBooking', urlencodedParser, bookingController.updateRate);

/**
 * API
 * Method POST
 * Remove Booking
 **/

router.post('/bookings/remove', urlencodedParser, bookingController.removeBooking);
router.post('/bookings/dell', urlencodedParser, bookingController.delBookMobie);

module.exports = router;