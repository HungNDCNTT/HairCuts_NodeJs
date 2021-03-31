let Details = require('../models/details');


/**
 * API
 * Method GET
 * Get booking API
 **/

module.exports.getAllDetail = function (req, res, next) {
    Details.find({}, function (err, details) {
        let result = [];
        res.setHeader('Content-Type', 'application/json');
        details.forEach(items => {
            result.push({
                detail_id:items._id,
                date: items.date,
                titles: items.titles,
                content: items.content,
                linksHD: items.linksHD,
            });
        });
        res.send(JSON.stringify(result));
    });
};

/**
 * API
 * Method POST
 * Add detail
 **/

module.exports.addDetail = function (req, res, next) {

    let details = new Details({
        titles: req.body.titles,
        content: req.body.content,
        linksHD: req.body.linksHD,
    });
    details.save()
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
 * Edit user in web
 **/

module.exports.getDetailsById = function (req, res, next) {
    Details.find({_id: req.body.id}, function (err, detailById) {
        let detailItems = [];
        res.setHeader('Content-Type', 'application/json');
        detailById.forEach(detailId => {
            detailItems.push({
                detail_id:detailId._id,
                date: detailId.date,
                titles: detailId.titles,
                content: detailId.content,
                linksHD: detailId.linksHD,
            });
        });
        res.send(JSON.stringify(detailItems));
    });
};

/**
 * API
 * Method POST
 * Delete Image by ID
 **/

module.exports.deleteDetailById = function (req, res, next) {
    Details.findByIdAndRemove({_id: req.body.id},
        function (err) {
            if (err) {
                res.status(500).json({message: 'Delete Failure!' + err});
            } else {
                res.status(200).json({returnCode: '10000', message: 'Delete Successfully !'});
            }
        }
    )
};