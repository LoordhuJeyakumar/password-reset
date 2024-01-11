const UserModel = require("../models/userModel");

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
    let newUser = request.body;
    let user = await UserModel.findOne({ email: newUser.email });
    if (!user) {
      await UserModel.create(newUser);
      response.status(201).send({ message: "User Created Successfully" });
    } else {
      response.status(400).send({
        message: `User with '${request.body.email}' already exists`,
      });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

