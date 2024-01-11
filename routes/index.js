const appRouter = require("express").Router();

appRouter.get("/", (req, res) =>
  res.status(200)
    .send(`<h1>Password Reset Flow with Database and Email Varification
  </h1><b style="color:white; background-color:green; padding:5">Connected to MongoDB Application Health is Good</b>`)
);

module.exports = appRouter;
