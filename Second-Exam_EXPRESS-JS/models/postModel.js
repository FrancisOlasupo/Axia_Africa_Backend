const mongoose = require("mongoose"); //step 1: import mongoose from node_module

//step 2: create a schema (structure) for the user details
const postSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true, //this ensures that this field is important and would throw an error if info is not provided
			ref: "User", //this ensures that the userId is a valid ObjectId and refers to a User document in the Users collection
		},
		title: {
			type: String,
			required: true, //this ensures that this field is important and would throw an error if info is not provided
		},
		content: {
			type: String,
			required: true, //this ensures that this field is important and would throw an error if info is not provided
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: false, //this field is optional, so it doesn't throw an error if info is not provided but still allows for likes to be stored as an array of userIds. If a like is made by a user who doesn't exist in the Users collection, the like will still be stored but the error will not be thrown.
			},
		],
		dislikes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

/* step 3: To export the schema we first create a constant variable with any reasonable name, then we use the "mongoose.model" method and inside of it we pass the Name("USER") and the structuredClone(userSchema) as the parameters into it. this will give the future addition the same structure */
const newPost = mongoose.model("POST", postSchema);

//step 4: export the model so that we can use it in other parts of our application
module.exports = newPost;
