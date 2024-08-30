const mongoose = require("mongoose"); //step 1: import mongoose from node_module

//step 2: create a schema (structure) for the user details
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true, //this ensures that this field is important and would throw an error if info is not provided
	},
	email: {
		type: String,
		required: true, //this ensures that this field is important and would throw an error if info is not provided
		unique: true, //this ensures that no two emails can be registered on our express application
	},
	password: {
		type: String,
		required: true, //this ensures that this field is important and would throw an error if info is not provided
	},
	department: {
		type: String,
		required: true, //this ensures that this field is important and would throw an error if info is not provided
	},
	yearOfStudy: {
		type: String,
		required: true, //this ensures that this field is important and would throw an error if info is not provided
	},
});

/* step 3: To export the schema we first create a constant variable with any reasonable name, then we use the "mongoose.model" method and inside of it we pass the Name("USER") and the structuredClone(userSchema) as the parameters into it. this will give the future addition the same structure */
const newUser = mongoose.model("USER", userSchema);

//step 4: export the model so that we can use it in other parts of our application
module.exports = newUser;
