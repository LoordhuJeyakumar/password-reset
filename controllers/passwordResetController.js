const UserModel = require("../models/userModel");
const crypto = require("crypto");
const VerifyTokenModal = require("../models/verifyToken");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const bcrypt = require("bcrypt");

const passwordResetToken = async (request, response) => {
  const email = request.body.email;
  const user = await UserModel.findOne({ email: email });
  try {
    if (user) {
      if (!user.resetToken) {
        const resetToken = jwt.sign(
          {
            username: user.username,
            email: user.email,
            id: user._id,
          },
          config.JWT_SECRET,
          { expiresIn: "1h" }
        );

        user.resetToken = resetToken;
        user.varification = false;

        await user.save();

        await sendVerificationEmail(user);
        response.status(200).send({
          message: `Password reset link sent to '${user.email}'`,
        });
      } else {
        let valid = jwt.verify(user.resetToken, config.JWT_SECRET);

        return response.status(409).send({
          message: `Pasword Reset link already sent to this email '${user.email}`,
        });
      }
    } else {
      response.status(404).send({ message: "User not found please signup" });
    }
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      user.resetToken = "";
      await user.save();
      return response.status(401).send({ message: "Token Expired" });
    }

    response.status(500).send({ error: error.message });
  }
};

const verifyResetToken = async (request, response) => {
  const { resetToken } = request.body;
  if (!resetToken) {
    response.status(400).json("Missing reset token");
  } else {
    try {
      const userByToken = await UserModel.findOne({ resetToken: resetToken });

      if (userByToken) {
        const decode = jwt.verify(resetToken, config.JWT_SECRET);
        const user = await UserModel.findById(decode.id);

        if (user.resetToken === resetToken) {
          user.varification = true;

          await user.save();
          response.status(200).send("ResetToken is valid");
        }
      } else {
        response.status(401).send("ResetToken is not valid");
      }
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return response.status(401).send("ResetToken is not valid");
      }

      if (error.name === "TokenExpiredError") {
        return response.status(401).send("ResetToken Expired");
      }

      return response.status(500).send({ error: error });
    }
  }
};

const resetPassword = async (request, response) => {
  const { resetToken, newPassword } = request.body;

  if (!resetToken && !newPassword) {
    response.status(400).json("Missing reset token or password");
  } else {
    try {
      const decodedToken = jwt.verify(resetToken, config.JWT_SECRET);

      const user = await UserModel.findById(decodedToken.id);

      const newPasswordHash = bcrypt.hashSync(newPassword, 10);
      user.passwordHash = newPasswordHash;
      user.varification = true;
      user.resetToken = "";
      await user.save();
      response.status(200).json("Reset successfully");
    } catch (error) {
      response.status(500).send({ error: error });
    }
  }
};

module.exports = {
  passwordResetToken,
  verifyResetToken,
  resetPassword,
};
