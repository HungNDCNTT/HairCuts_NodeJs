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


module.exports.getDetailsById = function (req, res, next) {
    BookingList.find({customer_id: req.body.customer_id}, function (err, detailById) {
        let detailItems = [];
        res.setHeader('Content-Type', 'application/json');
        detailById.forEach(booking => {
            detailItems.push({
                id:booking._id,
                dresser_id: booking.dresser_id,
                customer_id: booking.customer_id,
                name: booking.name,
                phone: booking.phone,
                time_book: booking.time_book,
                services: booking.services,
                price: booking.price,
                status: booking.status,
                result: booking.result,
                times: booking.times,
                totalEstimate: booking.totalEstimate
            });
        });
        res.send(JSON.stringify(detailItems));
    });
};

module.exports.getDetailsByIdddd = function (req, res, next) {
    BookingList.find({_id: req.body.id}, function (err, detailById) {
        let detailItems = [];
        res.setHeader('Content-Type', 'application/json');
        detailById.forEach(booking => {
            detailItems.push({
                id:booking._id,
                dresser_id: booking.dresser_id,
                customer_id: booking.customer_id,
                name: booking.name,
                phone: booking.phone,
                time_book: booking.time_book,
                services: booking.services,
                price: booking.price,
                status: booking.status,
                result: booking.result,
                times: booking.times,
                totalEstimate: booking.totalEstimate,
            });
        });
        res.send(JSON.stringify(detailItems));
    });
};


module.exports.getBookingApi = function (req, res, next) {
    BookingList.find({}, function (err, bookings) {
        let result = [];
        res.setHeader('Content-Type', 'application/json');
        bookings.forEach(booking => {
            result.push({
                id:booking._id,
                customer_id: booking.customer_id,
                name: booking.name,
                phone: booking.phone,
                time_book: booking.time_book,
                services: booking.services,
                price: booking.price,
                status: booking.status,
                result: booking.result,
                times: booking.times,
                totalEstimate: booking.totalEstimate
            });
        });
        res.send(JSON.stringify(result));
    });
};

module.exports.getBookingNow = function (req, res, next) {
    BookingList.find({times: new Date(Date.now()).toLocaleDateString()}, function (err, bookings) {
        // let result = [];
        // res.setHeader('Content-Type', 'application/json');
        // bookings.forEach(booking => {
        //     result.push({
        //         id:booking._id,
        //         customer_id: booking.customer_id,
        //         name: booking.name,
        //         phone: booking.phone,
        //         time_book: booking.time_book,
        //         services: booking.services,
        //         price: booking.price,
        //         status: booking.status,
        //         result: booking.result,
        //         times: booking.times
        //     });
        // });
        res.send(JSON.stringify(bookings));
    });
};


/**
 * API
 * Method POST
 * Add Booking Web
 **/

module.exports.insertBooking = function (req, res, next) {

    let booking = new BookingList({
        dresser_id: req.body.dresser_id,
        customer_id: req.body.customer_id,
        name: req.body.name,
        phone: req.body.phone,
        time_book: req.body.time_book,
        services: req.body.services,
        price: req.body.price,
        status: req.body.status,
        result: req.body.result,
        times: req.body.times,
        totalEstimate: req.body.totalEstimate,
    });
    booking.save()
        .then(item => {
            console.log('saved');
            res.status(200).json({message: 'Booking successfully !'});
            res.redirect('/bookings');
        })
        .catch(err => {
            res.status(500).json({message: err});
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
        req.body.id,
        {
            customer_id: req.body.customer_id,
            dresser_id: req.body.dresser_id,
            name: req.body.name,
            phone: req.body.phone,
            time_book: req.body.time_book,
            services: req.body.services,
            price: req.body.price,
            result: req.body.result,
            status: req.body.status,
            times: req.body.times,
            totalEstimate: req.body.totalEstimate,
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

