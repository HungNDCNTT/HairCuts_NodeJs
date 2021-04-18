let express = require('express');
const storage = require("node-sessionstorage");

let router = express.Router();

router.get('/', (req, res) => {
    if (storage.getItem("email") != null) {
        res.render('home');
    } else {
        res.render('login');
    }
})
router.get('/login', (req, res) => {
    if (storage.getItem("email") != null) {
        res.render('home');
    } else {
        res.render('login');
    }
})

router.get('/register', (req, res) => {
    if (storage.getItem("email") != null) {
        res.render('home');
    } else {
        res.render('register');
    }
})


router.get('/logout', (req, res) => {
    storage.setItem("email", null);
    storage.setItem("isLogin", false);
    res.render("login");
})
//router.get('/order', (req, res) => res.render('order'));
// router.get('/user', (req, res) => res.render('user'));
router.get('/recover', (req, res) => res.render('recover'));
var abc;
var valueQuery;
router.get('/home', (req, res) => {
    // if (storage.getItem('email') != null) {
    abc = req.query.gender

    if (abc == "wait") {
        valueQuery = "wait"
    } else if (abc == "done") {
        valueQuery = "done"
    } else {
        abc = "pedding"
        valueQuery = "booking"
    }
    BookingList.find({status: valueQuery}, function (err, bookings) {
        res.render("home", {dataa: bookings, select: abc});
        // res.render('booking', {
        //   title: 'Manager Booking',
        //   bookings: bookings
        // });
    });

    // } else {
    //   res.render("login");
    // }
});

let BookingList = require('../models/booking');
let HairDresser = require('../models/hair_dresser');

router.post('/home', (req, res) => {
    var varrrrr = ""
    var aa = ""
    switch (req.body.change) {
        case "Confirm":
            varrrrr = "wait"
            break;
        case "Deny":
            aa = "deny"
            varrrrr = "done"
            break;
        case "Completed":
            varrrrr = "done"
            break;

        case "View":
            varrrrr = "View"
            break;
    }

    if (varrrrr == ("View")) {
        BookingList.findOne({_id: req.body.abccc}, function (err, detailById) {
            HairDresser.findOne({_id: detailById.dresser_id}, function (err, dresserById) {
                res.render("user",{dataBook: detailById, dataDreser: dresserById});
            });
        });
    } else {
        BookingList.findByIdAndUpdate(
            req.body.abccc,
            {
                status: varrrrr,
                result: aa,
            }, function (err, response) {
                BookingList.find({status: valueQuery}, function (err, bookings) {
                    res.render("home", {dataa: bookings, select: abc});
                });
            }
        );
    }


    // if (storage.getItem('email') != null) {
    //   res.render("home");
    // } else {
    //   res.render("login");
    // }
});
router.get('/page-lockscreen', (req, res) => res.render('page/page-lockscreen'));
router.get('/profile', (req, res) => res.render('profile'));
router.get('/inbox', (req, res) => res.render('inbox'));
router.get('/mail-compose', (req, res) => res.render('mail-compose'));
router.get('/chat', (req, res) => res.render('chat'));
router.get('/calendar', (req, res) => res.render('calendar'));
router.get('/taskboard', (req, res) => res.render('taskboard'));
router.get('/map-google', (req, res) => res.render('map-google'));
router.get('/dressers', (req, res) => res.render('dressers'));

//File Manager
router.get('/file-home', (req, res) => res.render('file/file-home'));
router.get('/file-documents', (req, res) => res.render('file/file-documents'));
router.get('/file-media', (req, res) => res.render('file/file-media'));
router.get('/file-images', (req, res) => res.render('file/file-images'));

//Blog
router.get('/blog-home', (req, res) => res.render('blog/blog-home'));
router.get('/blog-details', (req, res) => res.render('blog/blog-details'));
router.get('/blog-list', (req, res) => res.render('blog/blog-list'));
router.get('/blog-post', (req, res) => res.render('blog/blog-post'));
router.get('/blog-details/:id', (req, res) => res.render('blog/blog-details'));

//HTML Status
router.get('/page-404', (req, res) => res.render('page/page-404'));
router.get('/page-403', (req, res) => res.render('page/page-403'));
router.get('/page-500', (req, res) => res.render('page/page-500'));
router.get('/page-503', (req, res) => res.render('page/page-503'));

module.exports = router;