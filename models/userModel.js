const mongoose = require("mongoose");

const validateEmail = (e) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(e);
};

const userSchema = new mongoose.Schema({
  username: { type: String, requierd: [true, "Username is requierd"] },
  email: {
    type: String,
    requierd: [true, "Email is requierd"],
    validate: validateEmail,
  },
  passwordHash: { type: String, requierd: [true, "Password is requierd"] },
  resetToken: { type: String, default: "" },
  varificationString: { type: String, default: "" },
  varification: { type: Boolean, default: false },
  createdAT: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model("User", userSchema, "users");

module.exports = UserModel;
