var Invoice = require('../models/invoice');

module.exports.getOrder = function (req, res, next) {
    Invoice.find({}, function (err, invoices) {
        res.render('order', {
            title: 'Manager Order',
            invoices: invoices
        });
    });
};

/**
 * API
 * Method: GET
 * Get order list
 */
module.exports.getOrderApi = function (req, res, next) {
    Invoice.find({}, function (err, invoices) {
        if (err) {
            res.json(invoices);
        }
        if (invoices.length == 0) {
            res.status(404).json(invoices)
        } else {
            res.status(200).json(invoices);
        }
    });
};

/**
 * API
 * Method: POST
 * Find order from customer_id
 */
module.exports.findOrderByCustomerApi = function(req, res, next) {
    Invoice.find({
        customer_id: req.body.customer_id
    }, function(err, invoices) {
        if(err) { res.status(401)};
        res.status(200).json(invoices);
    });
}

//Add product
module.exports.insertOrder = function (req, res, next) {
    // Define a JSONobject for the image attributes for saving to database
    // Create an instance of model SomeModel
    var invoice = new Invoice({
        customer_name: req.body.customer_name,
        shipping_address: req.body.address,
        payment_method: req.body.payment_method,
        payment_status: req.body.payment_status,
        product_name: req.body.product_name,
        product_quantity: req.body.product_quantity,
        product_price: req.body.product_price
    });
    invoice.save()
        .then(item => {
            console.log('saved');
            res.redirect('/order');
        })
        .catch(err => {
            console.log('unsaved');
        });
};

/**
 * API
 * Method: POST
 * Create new order
 */
module.exports.insertOrderApi = function(req, res, next) {
    // Define a JSONobject for the image attributes for saving to database
    // Create an instance of model SomeModel
    var invoice = new Invoice({
        customer_name: req.body.customer_name,
        customer_id: req.body.customer_id,
        shipping_address: req.body.shipping_address,
        product_name: req.body.product_name,
        product_quantity: req.body.product_quantity,
        product_price: req.body.product_price
    });
    invoice.save()
        .then(item => {
            res.status(200).json({
                mess: "Create order success !"
            })
        })
        .catch(err => {
            res.status(401).json(err)
        });
}

//Edit product
module.exports.editOrder = function (req, res, next) {
    Invoice.findByIdAndUpdate(
        req.body.iid, {
            customer_name: req.body.customer_name,
            shipping_address: req.body.address,
            payment_method: req.body.payment_method,
            payment_status: req.body.payment_status,
            product_name: req.body.product_name,
            product_quantity: req.body.product_quantity,
        },
        function (err) {
            res.redirect("/order");
        }
    );
};

//Remove product
module.exports.removeOrder = function (req, res, next) {
    Invoice.findByIdAndRemove(req.body.iid,
        function (err) {
            res.redirect('/order');
        }
    )
};
