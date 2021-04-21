let express = require('express');
const storage = require("node-sessionstorage");
let router = express.Router();
var abc;
var valueQuery;
let Image = require('../models/image');
let BookingList = require('../models/booking');
let HairDresser = require('../models/hair_dresser');
let Details = require('../models/details');
let Users = require('../models/user');
let multer = require('multer');
let fs = require('fs');
let upload = multer({dest: 'uploads/'})
let storagee = multer.diskStorage({
    destination: function (req, res, cb) {
        const dir = "./uploads";
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const bodyParser = require('body-parser');
const appacc = express();
appacc.use(bodyParser.urlencoded({extended: false}))
appacc.use(bodyParser.json())
var uploadd = multer({storage: storagee}).array('files', 12);
var uploadmmm = require('./multer')
var uploadImage = require('./multer')

const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv')
dotenv.config()
cloudinary.config({
    cloud_name: 'softss',
    api_key: '799882167926469',
    api_secret: '8ePPA1K2JqhQx9uNeKhu3_V3kkw'
})


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

router.get('/recover', (req, res) => res.render('recover'));

router.get('/home', (req, res) => {
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
    });
});

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
                res.render("user", {dataBook: detailById, dataDreser: dresserById});
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
});

router.get('/page-lockscreen', (req, res) => res.render('page/page-lockscreen'));
router.get('/profile', (req, res) => res.render('profile'));
router.get('/inbox', (req, res) => res.render('inbox'));
router.get('/mail-compose', (req, res) => res.render('mail-compose'));
router.get('/userManager', (req, res) => {
    Users.find({}, function (err, users) {
        res.render('user-manager', {
            title: 'User Manager',
            users: users
        });
    });
});
router.get('/dresser', (req, res) => {
    if (req.query.submit == undefined) {
        HairDresser.find({}, function (err, dresser) {
            let result = [];
            dresser.forEach(items => {
                result.push({
                    id: items._id.toString(),
                    hair_dress_id: items.hair_dress_id,
                    dress_title: items.dress_title,
                    content: items.content,
                    link_avt: items.link_avt,
                    comments: items.comments,
                    rate: items.rate,
                });
            });
            // idDresser
            res.render('dresser', {
                dresser: result
            });
        });
    } else if (req.query.submit == 'Add Dresser') {
        res.render('add-dresser');
    } else if (req.query.submit == 'Delete') {
        HairDresser.findByIdAndDelete({_id: req.query.idDresser},
            function (err) {
                HairDresser.find({}, function (err, dresser) {
                    let result = [];
                    dresser.forEach(items => {
                        result.push({
                            id: items._id.toString(),
                            hair_dress_id: items.hair_dress_id,
                            dress_title: items.dress_title,
                            content: items.content,
                            link_avt: items.link_avt,
                            comments: items.comments,
                            rate: items.rate,
                        });
                    });
                    // idDresser
                    res.render('dresser', {
                        dresser: result
                    });
                })
            }
        )
    }
});

router.get('/calendar', (req, res) => {
    res.render('calendar')
});


router.get('/post', (req, res) => {
    if (req.query.submit == undefined) {
        Image.find({}, function (err, images) {
            Details.find({}, function (err, details) {
                let result = [];
                details.forEach(items => {
                    result.push({
                        id: items._id.toString(),
                        post_id: items.post_id,
                        date: items.date,
                        titles: items.titles,
                        content: items.content,
                        linksHD: items.linksHD,
                        comments: items.comments,
                        rate: items.rate,
                    });
                });

                res.render('post', {data: images, dataNewPaper: result})
            });
        })
    } else if (req.query.submit == "Change image") {
        res.render('inbox')
    } else if (req.query.submit == "Save image") {
    } else if (req.query.submit == "Thêm Bài viết") {
        res.render('profile')
    } else if (req.query.submit == "Xóa") {
        Details.findByIdAndRemove({_id: req.query.id_new},
            function (err) {
                Image.find({}, function (err, images) {
                    Details.find({}, function (err, details) {
                        let result = [];
                        details.forEach(items => {
                            result.push({
                                id: items._id.toString(),
                                post_id: items.post_id,
                                date: items.date,
                                titles: items.titles,
                                content: items.content,
                                linksHD: items.linksHD,
                                comments: items.comments,
                                rate: items.rate,
                            });
                        });

                        res.redirect('/post')
                        res.render('post.ejs', {data: images, dataNewPaper: result})
                    });
                })
            }
        )


    }

});

router.post('/createNewPaper', uploadmmm.array('files'), async (req, res, next) => {


});
router.post('/upload', uploadmmm.array('files'), async (req, res, next) => {
    if (req.body.submit == "Save image") {
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const newPath = await new Promise(resolve => {
                cloudinary.uploader.upload(file.path)
                    .then(function (image) {
                        console.dir(image);
                        resolve({
                            url: image.url,
                            id: image.public_id
                        })
                    })
                    .then(function () {
                    })
                    .finally(function () {
                    });
            })
            urls.push(newPath.url)
            fs.unlinkSync(file.path)
        }

        Image.findOneAndRemove({}, function (err, data) {
            let image = new Image();
            image.image_link1 = urls[0]
            image.image_link2 = urls[1]
            image.image_link3 = urls[2]
            image.image_link4 = urls[3]
            image.image_link5 = urls[4]
            image.save()
                .then(status => {
                    Image.find({}, function (err, images) {
                        Details.find({}, function (err, details) {
                            let result = [];
                            details.forEach(items => {
                                result.push({
                                    id: items._id.toString(),
                                    post_id: items.post_id,
                                    date: items.date,
                                    titles: items.titles,
                                    content: items.content,
                                    linksHD: items.linksHD,
                                    comments: items.comments,
                                    rate: items.rate,
                                });
                            });

                            res.redirect('/post')
                            res.render('post.ejs', {data: images, dataNewPaper: result})
                        });
                    })
                })
                .catch(error => {
                    Image.find({}, function (err, images) {
                        Details.find({}, function (err, details) {
                            let result = [];
                            details.forEach(items => {
                                result.push({
                                    id: items._id.toString(),
                                    post_id: items.post_id,
                                    date: items.date,
                                    titles: items.titles,
                                    content: items.content,
                                    linksHD: items.linksHD,
                                    comments: items.comments,
                                    rate: items.rate,
                                });
                            });
                            res.redirect('/post')
                            res.render('post.ejs', {data: images, dataNewPaper: result})
                        });
                    })
                });
        });
    } else if (req.body.submit == "addNewPaper") {
        const newPath = await new Promise(resolve => {
            cloudinary.uploader.upload(req.files[0].path)
                .then(function (image) {
                    console.dir(image);
                    resolve({
                        url: image.url,
                        id: image.public_id
                    })
                })
                .then(function () {
                })
                .finally(function () {
                });
        })

        let details = new Details({
            titles: req.body.title,
            content: req.body.content,
            linksHD: newPath.url
        });
        details.save()
            .then(status => {
                Image.find({}, function (err, images) {
                    Details.find({}, function (err, details) {
                        let result = [];
                        details.forEach(items => {
                            result.push({
                                id: items._id.toString(),
                                post_id: items.post_id,
                                date: items.date,
                                titles: items.titles,
                                content: items.content,
                                linksHD: items.linksHD,
                                comments: items.comments,
                                rate: items.rate,
                            });
                        });
                        res.redirect('/post')
                        res.render('post.ejs', {data: images, dataNewPaper: result})
                    });
                })
            })
            .catch(error => {
                Image.find({}, function (err, images) {
                    Details.find({}, function (err, details) {
                        let result = [];
                        details.forEach(items => {
                            result.push({
                                id: items._id.toString(),
                                post_id: items.post_id,
                                date: items.date,
                                titles: items.titles,
                                content: items.content,
                                linksHD: items.linksHD,
                                comments: items.comments,
                                rate: items.rate,
                            });
                        });
                        res.redirect('/post')
                        res.render('post.ejs', {data: images, dataNewPaper: result})
                    });
                })
            });
    } else if (req.body.submit == "addNewDresser") {

        const newPath = await new Promise(resolve => {
            cloudinary.uploader.upload(req.files[0].path)
                .then(function (image) {
                    console.dir(image);
                    resolve({
                        url: image.url,
                        id: image.public_id
                    })
                })
                .then(function () {
                })
                .finally(function () {
                });
        })

        let hairDresser = new HairDresser({
            dress_title: req.body.title,
            content: req.body.content,
            link_avt: newPath.url
        });
        hairDresser.save()
            .then(status => {
                HairDresser.find({}, function (err, dresser) {
                    let result = [];
                    dresser.forEach(items => {
                        result.push({
                            id: items._id.toString(),
                            hair_dress_id: items.hair_dress_id,
                            dress_title: items.dress_title,
                            content: items.content,
                            link_avt: items.link_avt,
                            comments: items.comments,
                            rate: items.rate,
                        });
                    });
                    // idDresser
                    res.redirect('/dresser')
                    res.render('dresser', {
                        dresser: result
                    });
                });
            })
            .catch(error => {
                HairDresser.find({}, function (err, dresser) {
                    let result = [];
                    dresser.forEach(items => {
                        result.push({
                            id: items._id.toString(),
                            hair_dress_id: items.hair_dress_id,
                            dress_title: items.dress_title,
                            content: items.content,
                            link_avt: items.link_avt,
                            comments: items.comments,
                            rate: items.rate,
                        });
                    });
                    // idDresser
                    res.redirect('/dresser')
                    res.render('dresser', {
                        dresser: result
                    });
                });
            });
    }
});
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