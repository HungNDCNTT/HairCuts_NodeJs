let multer = require('multer');
let storagee = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
let fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpge' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {

    }
}
let uploadddd = multer({storage: storagee, fileFilter: fileFilter});

module.exports = uploadddd