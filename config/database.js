//Import the mongoose module
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoDB = "mongodb+srv://haircutAdmin:admin@cluster0.hvw7p.mongodb.net/test";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
const initMongoServer = async() => {
        await mongoose.connect(mongoDB, options)
        .then(console.log("Connected to DB !!"))
        .catch(err => console.log(err));
};

 //Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", (error) => console.error.bind(console, "MongoDB connection error:" + error.name));
db.on("connected", () => console.error.bind(console, "mongo: Connected"));
db.on("disconnected", () => console.error.bind(console, "mongo: Disconnected"));

module.exports = initMongoServer;
