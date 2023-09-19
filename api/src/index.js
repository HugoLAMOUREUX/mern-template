const express = require("express");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config({ path: "./src/config/.env" });
const { errorHandler } = require("./middlewares/errorMiddleware");
const { PORT, ENVIRONMENT, APP_URL } = require("./config/config");

const app = express();

//to pass data in the body : middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//middleware to allow access control allow origin
app.use(cors({ origin: [APP_URL], credentials: true }));

require("./config/db");
require("./middlewares/passport")(app);

//add the routes related to tracks
app.use("/user", require("./routes/userRoute"));

//to see the error messages
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
