const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");

mongoose
  .connect(MONGO_URL)
  .then((r) => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("Connection failed", error);
  });

mongoose.Promise = global.Promise; //Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("CONNECTED OK"));

module.exports = db;
