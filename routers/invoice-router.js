let express = require('express');
const bodyParser = require('body-parser');

let router = express.Router();

let invoiceController = require('../controllers/invoice-controller');

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({
    extended: false
});

/* GET order page. */
router.get('/order', invoiceController.getOrder);

/* API GET order list */
router.get('/api/order', invoiceController.getOrderApi);

/* POST order add page. */
router.post('/order/add', urlencodedParser, invoiceController.insertOrder);

/* API POST add order */
router.post('/api/order/add', urlencodedParser, invoiceController.insertOrderApi);

/* API POST find order by customer id */
router.post('/api/order/user', urlencodedParser, invoiceController.findOrderByCustomerApi);

/* POST order edit page. */
router.post('/order/edit', urlencodedParser, invoiceController.editOrder);

/* POST order remove page. */
router.post('/order/remove', urlencodedParser, invoiceController.removeOrder);

module.exports = router;