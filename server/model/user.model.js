const userDatabase = require("./user.mongo");

async function createUser(user) {
	const oldUserName = await userDatabase.findOne({ name: user.name });
	const oldUserPhone = await userDatabase.findOne({ phone: user.phone });
	if (oldUserName || oldUserPhone) {
		return false;
	}

	await userDatabase.create(user);

	return true;
}

async function findUsers() {
	return await userDatabase.find({});
}

async function removeUser(phone) {
	try {
		await userDatabase.deleteOne({ phone: phone });
	} catch (err) {
		return false;
	}
	return true;
}

module.exports = { createUser, findUsers, removeUser };
