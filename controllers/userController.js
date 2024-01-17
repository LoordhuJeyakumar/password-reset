const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAllUsers = async (request, response) => {
  try {
    let users = await UserModel.find();
    response.status(200).send({ message: "Users fetched", users });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await UserModel.findById(id);

    if (user) {
      response.status(200).send({ message: "User Fetched", user });
    } else {
      response.status(400).send({ message: "User ID Not Found" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const createUser = async (request, response) => {
  try {
    let { username, email, password } = request.body;
    let user = await UserModel.findOne({ email: email });
    if (user) {
      return response.status(409).send({
        message: `User with '${request.body.email}' already exists`,
      });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    let newUser = new UserModel({
      username,
      email,
      passwordHash,
    });

    await newUser
      .save()
      .then(() => {
        response.status(201).json({ message: "User created successfully" });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const editUserById = async (request, response) => {
  try {
    const { id } = request.params;
    console.log(id);
    await UserModel.findByIdAndUpdate(id, request.body)
      .then((updatedUser) => {
        if (updatedUser) {
          response.status(200).json({ message: "User replaced successfully " });
        } else {
          response.status(404).json({ message: "id does not exist" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const deleteUser = async (request, response) => {
  try {
    let { id } = request.params;
    let user = await UserModel.findById(id);
    if (user) {
      await UserModel.deleteOne({ _id: id });
      response.status(200).send({ message: "User Deleted Succesfully" });
    } else {
      response.status(400).send({ message: "Invalid User Id" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUserById,
  deleteUser,
};
