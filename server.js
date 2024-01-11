const express = require("express");
const cors = require("cors");
const appRouter = require("./routes/index");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/", appRouter);

module.exports = app;
