async function getUsers() {
	const req = await fetch("http://localhost:5000/user");
	const users = await req.json();
	// console.log(users);
	return users;
}

async function submitUser(fname, lname, phone) {
	const user = {
		name: fname.toLowerCase() + " " + lname.toLowerCase(),
		phone: phone,
	};
	// console.log(user);
	const res = await fetch("http://localhost:5000/user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	return res;
}

async function deleteUser(id) {
	const res = await fetch("http://localhost:5000/user/" + id, {
		method: "DELETE",
	});
	return res;
}

const usernames = [];

const ul = document.createElement("ul");

// console.log(ul);

async function makeTable() {
	const users = await getUsers();

	for (let i = 0; i < users.length; i++) {
		usernames.push({
			name: users[i].name,
			phone: users[i].phone,
		});
	}

	makeList(usernames);
	produceTable(users);
}

async function produceTable(users) {
	$("#contactTable tbody").empty();
	for (let i = 0; i < users.length; i++) {
		// const li = document.createElement("li");
		// li.innerText = users[i].name;
		// ul.appendChild(li);

		$("#contactTable tbody").append(
			"<tr>" +
				"<td></td>" +
				"<td>" +
				users[i].name +
				"</td>" +
				"<td>" +
				users[i].phone +
				"</td>" +
				"<td>" +
				"<button class='delete-row'>Delete</button>" +
				"</td>" +
				"</tr>"
		);
	}

	const btnns = $(".delete-row");
	btnns.on("click", handleButton);
	return;
}

const makeList = (lists) => {
	let li = "";
	for (i in lists) {
		// console.log(lists[i].name);
		li += "<li class='list-item'>" + lists[i].name + "</li>";
	}
	ul.innerHTML = li;
};

// const listItemClick = (e) => {
// 	console.log(e);
// };

$(document).ready(async function () {
	await makeTable();

	// const lis = document.querySelectorAll(".list-item");
	// console.log(lis);

	document.getElementById("names-list").appendChild(ul);
	// const btnns = $(".delete-row");
	// btnns.on("click", handleButton);
	// console.log(btnns);
});

function toggleList() {
	const list = document.getElementById("names-list");
	list.classList.toggle("hide");
}

const searchUser = (e) => {
	produceTable(globalFilterList);
	toggleList();
};

let globalFilterList = [];
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", searchUser);
const input = document.getElementById("searching");
const filterList = (e) => {
	keyword = input.value.toLowerCase();
	const filtered = usernames.filter((user) => {
		// console.log(user);
		return user.name.toLowerCase().includes(keyword);
	});
	globalFilterList = filtered;
	// console.log(globalFilterList);
	makeList(filtered);
};
input.addEventListener("keyup", filterList);
input.addEventListener("focus", toggleList);

const handleButton = (e) => {
	// console.log(e.target.parentElement.parentElement.children[2].innerText);
	const confirmation = window.confirm(
		"Are you sure you want to delete this contact?"
	);
	if (confirmation) {
		deleteUser(e.target.parentElement.parentElement.children[2].innerText);
		e.target.parentElement.parentElement.remove();
	}
};

// for(let i = 0; i < 10; i++) {
function productsAdd() {
	$("#contactTable tbody").append(
		"<tr>" +
			"<td></td>" +
			"<td>" +
			$("#f-name").val() +
			"&nbsp;" +
			$("#l-name").val() +
			"</td>" +
			"<td>" +
			$("#phoneNum").val() +
			"</td>" +
			"<td>" +
			"<button class='delete-row'>Delete</button>" +
			"</td>" +
			"</tr>"
	);
}

function formClear() {
	$("#f-name").val("");
	$("#l-name").val("");
	$("#phoneNum").val("");
}

const button = document.querySelector("#contact-submit");
button.addEventListener("click", async (e) => {
	e.preventDefault();
	const result = await submitUser(
		$("#f-name").val(),
		$("#l-name").val(),
		$("#phoneNum").val()
	);

	if (result.status === 200) {
		productsAdd();
		formClear();
	} else {
		const err = await result.json();
		alert(err.message);
	}
});

const sortBtn = document.getElementById("sort-btn");
sortBtn.addEventListener("click", () => {
	const table = document.getElementById("contactTable");
	const rows = table.rows;
	const sorted = Array.from(rows)
		.slice(1)
		.sort((rowA, rowB) => {
			// console.log(rowA, rowB);
			return rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1;
		});
	table.tBodies[0].append(...sorted);
});
