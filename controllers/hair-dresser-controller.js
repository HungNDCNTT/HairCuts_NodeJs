let HairDresser = require('../models/hair_dresser');


/**
 * API
 * Method GET
 * Get dresser API
 **/

module.exports.getAllDresser = function (req, res, next) {
    HairDresser.find({}, function (err, dressers) {
        let result = [];
        res.setHeader('Content-Type', 'application/json');
        dressers.forEach(items => {
            result.push({
                id: items._id,
                hair_dress_id: items.hair_dress_id,
                dress_title: items.dress_title,
                content: items.content,
                link_avt: items.link_avt,
                comments: items.comments,
                rate: items.rate,
                isBusy: items.isBusy,
                timeBusy: items.timeBusy,
            });
        });
        res.send(JSON.stringify(result));
    });
};

/**
 * API
 * Method GET
 * Get Dresser Web
 **/

module.exports.getAllDresserWeb = function (req, res, next) {
    HairDresser.find({}, function (err, dresser) {
        res.render('dresser', {
            dresser: dresser
        });
    });
};

/**
 * API
 * Method POST
 * Add detail
 **/

module.exports.addHairDresser = function (req, res, next) {
    let hairDresser = new HairDresser({
        dress_title: req.body.dress_title,
        content: req.body.content,
        link_avt: req.body.link_avt,
        comments: req.body.comments,
        rate: req.body.rate,
        isBusy: req.body.isBusy,
        timeBusy: req.body.timeBusy,
    });
    hairDresser.save()
        .then(status => {
            res.setHeader('Content-Type', 'application/json');
            console.log('saved');
            res.status(200).json({returnCode: '10000', message: 'Successfully !'});
        })
        .catch(error => {
            res.status(500).json({error: error.name});
            console.log('unsaved' + error);
        });
};

/**
 * API
 * Method POST
 * get dresser by id api
 **/

module.exports.getDresserById = function (req, res, next) {
    HairDresser.find({_id: req.body.id}, function (err, dresserById) {
        let dresserItems = [];
        res.setHeader('Content-Type', 'application/json');
        dresserById.forEach(detailId => {
            dresserItems.push({
                _id: detailId.id,
                dress_title: detailId.dress_title,
                content: detailId.content,
                link_avt: detailId.link_avt,
                comments: detailId.comments,
                rate: detailId.rate,
                isBusy: detailId.isBusy,
                timeBusy: detailId.timeBusy,
            });
        });
        res.send(JSON.stringify(dresserItems));
    });
};

/**
 * API
 * Method POST
 * Delete Image by ID
 **/

module.exports.deleteDresserById = function (req, res, next) {
    HairDresser.findOne({_id: req.body.id}, function (err, exist) {
        if (!exist) {
            res.status(500).json({message: 'This id is not exits '});
        } else {
            HairDresser.findByIdAndDelete({_id: req.body.id},
                function (err) {
                    if (err) {
                        res.status(500).json({message: 'Delete Failure!' + err});
                    } else {
                        res.status(200).json({returnCode: '10000', message: 'Delete Successfully !'});
                    }
                }
            )
        }
    })
};

/**
 * API
 * Method POST
 * Update Comment ID
 **/

module.exports.updateComment = function (req, res, next) {
    HairDresser.findOne({hair_dress_id: req.body.hair_dress_id}, function (err, exits) {
        if (!exits) {
            res.status(500).json({message: 'This Dresser is not exits!'});
            return null;
        } else {
            HairDresser.findOneAndUpdate(
                {hair_dress_id: req.body.hair_dress_id},
                {
                    $push: {comments: req.body.comments,},
                },
                function (err) {
                    if (err) {
                        res.status(500).json({message: 'Somethings went wrong !' + err});
                    } else {
                        res.status(200).json({message: 'Comment updated !'})
                    }
                }
            );
        }
    })
};