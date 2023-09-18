const ENVIRONMENT = process.env.ENVIRONMENT || "development";
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.JWT_SECRET || "not-so-secret";

const CONFIG = {
  ENVIRONMENT,
  PORT,
  MONGO_URL,
  SECRET,
};

if (ENVIRONMENT === "development") console.log(CONFIG);

module.exports = CONFIG;
