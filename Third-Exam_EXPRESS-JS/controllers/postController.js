const Post = require("../models/Post"); // Step 1: Import the Post model
const User = require("../models/User"); // Step 2: Import the User model

// Step 3: Create a constant variable createPost to store the asynchronous function for creating a post
const createPost = async (req, res) => {
	const { title, content } = req.body; // Step 4: Destructure post details from the request body
	const userId = req.user.id; // Step 5: Get the user ID from the authenticated request

	try {
		// Step 6: Create a new post instance with the provided details
		const post = new Post({ userId, title, content });
		const savedPost = await post.save(); // Step 7: Save the new post to the database
		res.status(201).json(savedPost); // Step 8: Send a success response with the created post
	} catch (error) {
		// Step 9: Handle any errors that occur during post creation
		res.status(500).json({ error: error.message });
	}
};

// Step 10: Create a constant variable getAllPosts to store the asynchronous function to retrieve all posts
const getAllPosts = async (req, res) => {
	try {
		// Step 11: Find all posts and populate the user data (name, department, year of study)
		const posts = await Post.find().populate(
			"userId",
			"name department yearOfStudy"
		);
		res.json(posts); // Step 12: Send a response with all posts
	} catch (error) {
		// Step 13: Handle any errors that occur during retrieving posts
		res.status(500).json({ error: error.message });
	}
};

// Step 14: Create a constant variable getSinglePost to store the asynchronous function to retrieve a single post by ID
const getSinglePost = async (req, res) => {
	const { id } = req.params; // Step 15: Get the post ID from the request parameters

	try {
		// Step 16: Find the post by ID and populate the user data
		const post = await Post.findById(id).populate(
			"userId",
			"name department yearOfStudy"
		);
		if (!post) return res.status(404).json({ message: "Post not found" });
		res.json(post); // Step 17: Send a response with the single post
	} catch (error) {
		// Step 18: Handle any errors that occur during retrieving the post
		res.status(500).json({ error: error.message });
	}
};

// Step 19: Create a constant variable likePost to store the asynchronous function for liking a post
const likePost = async (req, res) => {
	const { id } = req.params; // Step 20: Get the post ID from the request parameters
	const userId = req.user.id; // Step 21: Get the user ID from the authenticated request

	try {
		// Step 22: Find the post by ID
		const post = await Post.findById(id);
		if (!post) return res.status(404).json({ message: "Post not found" });

		// Step 23: Check if the user has already liked the post
		if (post.likes.includes(userId)) {
			return res
				.status(400)
				.json({ message: "You have already liked this post" });
		}

		// Step 24: Remove the user from dislikes if they exist
		post.dislikes = post.dislikes.filter(
			(user) => user.toString() !== userId
		);

		// Step 25: Add the user to likes
		post.likes.push(userId);

		// Step 26: Save the updated post
		await post.save();

		// Step 27: Send a response with the updated post
		res.json(post);
	} catch (error) {
		// Step 28: Handle any errors that occur during liking the post
		res.status(500).json({ error: error.message });
	}
};

// Step 29: Create a constant variable dislikePost to store the asynchronous function for disliking a post
const dislikePost = async (req, res) => {
	const { id } = req.params; // Step 30: Get the post ID from the request parameters
	const userId = req.user.id; // Step 31: Get the user ID from the authenticated request

	try {
		// Step 32: Find the post by ID
		const post = await Post.findById(id);
		if (!post) return res.status(404).json({ message: "Post not found" });

		// Step 33: Check if the user has already disliked the post
		if (post.dislikes.includes(userId)) {
			return res
				.status(400)
				.json({ message: "You have already disliked this post" });
		}

		// Step 34: Remove the user from likes if they exist
		post.likes = post.likes.filter((user) => user.toString() !== userId);

		// Step 35: Add the user to dislikes
		post.dislikes.push(userId);

		// Step 36: Save the updated post
		await post.save();

		// Step 37: Send a response with the updated post
		res.json(post);
	} catch (error) {
		// Step 38: Handle any errors that occur during disliking the post
		res.status(500).json({ error: error.message });
	}
};

// Step 39: Export all the functions to be used in other parts of the application
module.exports = {
	createPost,
	getAllPosts,
	getSinglePost,
	likePost,
	dislikePost,
};
