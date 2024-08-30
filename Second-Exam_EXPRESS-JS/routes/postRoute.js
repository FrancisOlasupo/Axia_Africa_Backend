const express = require("express"); //import express
const router = express.Router(); // create an instance of the router
const {
	createPost,
	getAllPosts,
	getSinglePost,
	likePost,
	dislikePost,
} = require("../controllers/postController"); // import the post controller
const userAuth = require("../middleware/auth");

router.post("/", userAuth, createPost); //post request
router.get("/", getAllPosts); //get request
router.get("/:id", getSinglePost); //get request
router.post("/:id/like", userAuth, likePost); //like post
router.post("/:id/dislike", userAuth, dislikePost); //dislike post

module.exports = router; //export post router
