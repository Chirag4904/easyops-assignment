const mongoose = require("mongoose");

const MONGO_URL =
	"mongodb+srv://chirag:ca123456@nasacluster.hgrntbn.mongodb.net/easyops";

mongoose.connection.once("open", () => {
	console.log("mongodb is ready");
});

mongoose.connection.on("error", (err) => {
	console.error(err);
});

async function mongoConnect() {
	await mongoose.connect(process.env.MONGO || MONGO_URL);
}

async function mongoDisconnect() {
	await mongoose.disconnect();
}

module.exports = {
	mongoConnect,
	mongoDisconnect,
};
