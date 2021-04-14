let Services = require('../models/services');

/**
 * API
 * Method GET
 * Get service web
 **/
module.exports.getAllServiceWeb = function (req, res, next) {
    Services.find({}, function (err, services) {
        res.render('services', {
            title: 'Manager services',
            services: services
        });
    });
};
/**
 * API
 * Method GET
 * Get service Web by id
 **/


module.exports.getServicesByIdWeb = function (req, res, next) {
    Services.find({_id: req.body.id}, function (err, serviceById) {
        let serviceItems = [];
        res.setHeader('Content-Type', 'application/json');
        serviceById.forEach(service => {
            serviceItems.push({
                id: service._id,
                service_name: service.service_name,
                service_price: service.service_price,
                times: service.times,
            });
        });
        res.render('services', {
            title: 'Manager services',
            services: serviceItems
        });
    });
};

/**
 * API
 * Method GET
 * Get service API by id
 **/


module.exports.getServicesById = function (req, res, next) {
    Services.find({_id: req.body.id}, function (err, serviceById) {
        let serviceItems = [];
        res.setHeader('Content-Type', 'application/json');
        serviceById.forEach(service => {
            serviceItems.push({
                id: service._id,
                service_name: service.service_name,
                service_price: service.service_price,
                times: service.times,
            });
        });
        res.send(JSON.stringify(serviceItems));
    });
};

/**
 * API
 * Method GET
 * Get all service API
 **/

module.exports.getAllServices = function (req, res, next) {
    Services.find({}, function (err, services) {
        if (err) {
            res.status(500).json({message: err});
        }
        let result = [];
        res.setHeader('Content-Type', 'application/json');
        services.forEach(service => {
            result.push({
                id: service._id,
                service_name: service.service_name,
                service_price: service.service_price,
                times: service.times,
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

module.exports.addServiceWeb = function (req, res, next) {

    let service = new Services({
        service_name: req.body.service_name,
        service_price: req.body.service_price,
        times: req.body.times,
    });
    service.save()
        .then(item => {
            console.log('saved');
            res.status(200).json({message: 'Add service successfully !'});
            res.redirect('/services');
        })
        .catch(err => {
            res.status(500).json({message: err});
            console.log('unsaved');
        });
};

/**
 * API
 * Method POST
 * Add Booking Api
 **/

module.exports.addService = function (req, res, next) {

    let service = new Services({
        service_name: req.body.service_name,
        service_price: req.body.service_price,
        times: req.body.times,
    });
    service.save()
        .then(item => {
            console.log('saved');
            res.status(200).json({message: 'Add service successfully !'});
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

module.exports.updateServiceWeb = function (req, res, next) {

    Services.findByIdAndUpdate(
        req.body.service_id,
        {
            service_name: req.body.service_name,
            service_price: req.body.service_price,
            times: req.body.times,
        },
        function (err) {
            res.redirect("/services");
        }
    );
};

/**
 * API
 * Method POST
 * Edit user in api
 **/

module.exports.updateServiceApi = function (req, res, next) {

    Services.findByIdAndUpdate(
        req.body.id,
        {
            service_name: req.body.service_name,
            service_price: req.body.service_price,
            times: req.body.times,
        },
        function (err, ok) {
            if (err) {
                res.status(500).json({message: "Something went wrong!" + err});

            } else {
                res.status(200).json({message: "Successful !"});
            }
        }
    );
};

/**
 * API
 * Method POST
 * remove booking in web
 **/

module.exports.removeServiceWeb = function (req, res, next) {
    Services.findByIdAndRemove(req.body.id,
        function (err) {
            res.redirect('/services');
        }
    )
};

/**
 * API
 * Method POST
 * remove booking in api
 **/

module.exports.removeService = function (req, res, next) {
    Services.findByIdAndRemove(req.body.id,
        function (err) {
            if (err) {
                res.status(500).json({message: err});
            } else {
                res.status(200).json({message: "Successful !"});
            }
        }
    )
};

