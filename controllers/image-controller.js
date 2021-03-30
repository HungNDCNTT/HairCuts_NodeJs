let Image = require('../models/image');

/**
 * API
 * Method POST
 * Add Image
 **/

module.exports.addImage = function (req, res, next) {

    let image = new Image({
        image_link1: req.body.image_link1,
        image_link2: req.body.image_link2,
        image_link3: req.body.image_link3,
        image_link4: req.body.image_link4,
        image_link5: req.body.image_link5,
    });
    image.save()
        .then(item => {
            console.log('saved');
            res.status(200).json({message: 'Add Image Successfully !'});
            res.redirect('/add_image');
        })
        .catch(err => {
            res.status(500).json({message: err});
            console.log('unsaved' + err);
        });
};

/**
 * API
 * Method GET
 * Get All Image Api
 **/

module.exports.getAllImage = function (req, res, next) {
    Image.find({}, function (err, images) {
        let result = [];
        res.setHeader('Content-Type', 'application/json');
        images.forEach(image => {
            result.push({
                image_link1: image.image_link1,
                image_link2: image.image_link2,
                image_link3: image.image_link3,
                image_link4: image.image_link4,
                image_link5: image.image_link5,
            });
        });
        res.send(JSON.stringify(result));
    });
};
