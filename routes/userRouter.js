const userRouter = require("express").Router();
const userController = require("../controllers/userController.js");

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/createUser", userController.createUser);
userRouter.put("/edit/:id",userController.editUserById)
userRouter.delete("/delete/:id",userController.deleteUser)

module.exports = userRouter;
