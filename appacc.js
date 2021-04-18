//Config Express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const commonRouter = require('./routers/common-router');
const bookingRouter = require('./routers/booking-router');
const authenticationRouter = require('./routers/authentication-router');
const userRouter = require('./routers/user-router');
const invoiceRouter = require('./routers/invoice-router');
const imageRouter = require('./routers/image-router');
const detailsRouter = require('./routers/details-router');
const dressersRouter = require('./routers/hair-dresser-router');
const serviceRouter = require('./routers/services-router');

//Init connection to MongoDB
const initMongoServer = require('./config/database');

const appacc = express();
// appacc.get("/", (req, res)=>{
//     res.send('ccccccccccccccc')
// })
appacc.use(express.static(__dirname));

//Config EJS
appacc.set('views', path.resolve(__dirname, 'views'));
appacc.set('view engine', 'ejs');
appacc.set('views', './views');

//Start server
const port = process.env.PORT || '3000';

appacc.use(bodyParser.urlencoded({ extended: false }))

// Middleware
appacc.use(bodyParser.json());

appacc.listen(port, () => console.log(`Running on localhost:${port}`));

initMongoServer();

//Config Router/Render
appacc.use(commonRouter);
appacc.use(bookingRouter);
appacc.use(authenticationRouter);
appacc.use(userRouter);
appacc.use(invoiceRouter);
appacc.use(imageRouter);
appacc.use(detailsRouter);
appacc.use(dressersRouter);
appacc.use(serviceRouter);

//Redirect if page not found
appacc.get('*', (req, res) => res.status(404).render('page/page-404'));

