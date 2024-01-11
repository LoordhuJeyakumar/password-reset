require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;
const DB_NAME = process.env.DB_NAME

module.exports = {
  MONGODB_URI,
  PORT,
  HOSTNAME,
  DB_NAME
};