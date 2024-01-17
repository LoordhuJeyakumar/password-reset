const passwordResetController = require("../controllers/passwordResetController");
const passwordResetRouter = require("express").Router();

passwordResetRouter.post(
  "/passwordResetToken",
  passwordResetController.passwordResetToken
);

passwordResetRouter.post(
  "/verifyResetToken",
  passwordResetController.verifyResetToken
);

passwordResetRouter.post(
  "/resetPassword",
  passwordResetController.resetPassword
);

module.exports = passwordResetRouter;
