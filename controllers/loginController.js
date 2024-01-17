const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const bcrypt = require("bcrypt");

const login = async (request, response) => {
  let { email, password } = request.body;

  if (!email && !password) {
    response.status(400).json("Missing username and password");
  } else {
    try {
      let user = await UserModel.findOne({ email });

      if (!user) {
        return response
          .status(401)
          .json({ message: "user does not exist, Please Signup!" });
      }

      // if the user exists, compare the password with the passwordHash stored in the database
      const isAuthenticated = await bcrypt.compare(password, user.passwordHash);

      if (!isAuthenticated) {
        return response.status(401).json({ message: "invalid password" });
      }

      // if the password matches, generate a token
      const accessToken = jwt.sign(
        {
          username: user.username,
          email: user.email,
          id: user._id,
        },
        config.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // send the token back to the user
      response
        .status(200)
        .json({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken,
        });
    } catch (error) {
      response.status(500).send({ error: error.message });
    }
  }
};

module.exports = {
  login,
};
