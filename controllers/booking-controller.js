let BookingList = require('../models/booking');

/**
 * API
 * Method GET
 * Get booking web
 **/
module.exports.getBooking = function (req, res, next) {
    BookingList.find({}, function (err, bookings) {
        res.render('booking', {
            title: 'Manager Booking',
            bookings: bookings
        });
    });
};

/**
 * API
 * Method GET
 * Get booking API
 **/

module.exports.getBookingApi = function (req, res, next) {
    BookingList.find({}, function (err, bookings) {
        let result = [];
        res.setHeader('Content-Type', 'application/json');
        bookings.forEach(booking => {
            result.push({
                customer_id: booking.customer_id,
                name: booking.name,
                phone: booking.phone,
                services: booking.services,
                price: booking.price,
                status: booking.status,
                times: booking.times
            });
        });
        res.send(JSON.stringify(result));
    });
};

/**
 * API
 * Method POST
 * Add Booking Web
 **/

module.exports.insertBooking = function (req, res, next) {

    let booking = new BookingList({
        customer_id: req.body.customer_id,
        name: req.body.name,
        phone: req.body.phone,
        services: req.body.services,
        price: req.body.price,
        status: req.body.status,
        times: req.body.times
    });
    booking.save()
        .then(item => {
            console.log('saved');
            res.status(200).json({mess: 'Booking successfully !'});
            res.redirect('/bookings');
        })
        .catch(err => {
            res.status(500).json({mess: err});
            console.log('unsaved');
        });
};

/**
 * API
 * Method POST
 * Edit user in web
 **/

module.exports.editBooking = function (req, res, next) {

    BookingList.findByIdAndUpdate(
        req.body.pid,
        {
            customer_id: req.body.customer_id,
            name: req.body.name,
            phone: req.body.phone,
            services: req.body.services,
            price: req.body.price,
            status: req.body.status,
            times: req.body.times
        },
        function (err) {
            res.redirect("/booking");
        }
    );
};

/**
 * API
 * Method POST
 * remove booking in web
 **/

module.exports.removeBooking = function (req, res, next) {
    BookingList.findByIdAndRemove(req.body.pid,
        function (err) {
            res.redirect('/booking');
        }
    )
};

/**
 * API
 * Method GET
 * Get booking in web
 **/

module.exports.getBookingsApi = function (req, res, next) {
    BookingList.find({}, function (err, bookings) {
        res.json(bookings)
    });
};

