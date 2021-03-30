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

//Init connection to MongoDB
const initMongoServer = require('./config/database');

const app = express();

app.use(express.static(__dirname));

//Config EJS
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views', './views');

//Start server
const port = process.env.PORT || '3000';

// Middleware
app.use(bodyParser.json());

app.listen(port, () => console.log(`Running on localhost:${port}`));

initMongoServer();

//Config Router/Render
app.use(commonRouter);
app.use(bookingRouter);
app.use(authenticationRouter);
app.use(userRouter);
app.use(invoiceRouter);
app.use(imageRouter);
app.use(detailsRouter);

//Redirect if page not found
app.get('*', (req, res) => res.status(404).render('page/page-404'));

