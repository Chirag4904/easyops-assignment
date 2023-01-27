const express = require("express");
const userRouter = express.Router();
const {
	addUser,
	getUsers,
	deleteUser,
} = require("../controllers/user.controller");

userRouter.get("/", getUsers);
userRouter.post("/", addUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
