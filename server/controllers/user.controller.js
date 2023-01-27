const { createUser, findUsers, removeUser } = require("../model/user.model");
// async function getUsers(){

// }

async function addUser(req, res) {
	if (!req.body.name || !req.body.phone) {
		res.status(400).send({ message: "Name and Phone are required" });
		return;
	}
	const user = {
		name: req.body.name,
		phone: req.body.phone,
	};
	const result = await createUser(user);
	if (result) {
		res.status(200).send({ message: "User created successfully" });
	} else {
		res.status(400).send({ message: "User already exists" });
	}
}

async function getUsers(req, res) {
	const users = await findUsers();
	res.status(200).send(users);
}

async function deleteUser(req, res) {
	const id = req.params.id;
	const result = await removeUser(id);
	if (result) {
		res.status(200).send({ message: "User deleted successfully" });
	} else {
		res.status(400).send({ message: "User not found" });
	}
}

module.exports = { addUser, getUsers, deleteUser };
