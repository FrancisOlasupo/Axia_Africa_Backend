"use strict";

const express = require("express"); //import express library from node_modules
const app = express(); //creating an instance of the express application
const dotenv = require("dotenv"); //importing dotenv from node_module
dotenv.config(); //configuring dotenv
const mongoose = require("mongoose"); // Import mongoose for database connection
const userRoutes = require("./routes/userRoute"); // Import authentication routes for handling user registration and login
const postRoutes = require("./routes/postRoute"); // Import post routes for handling post-related actions

// Connect to MongoDB using mongoose
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("connected successfully"))
	.catch(() => console.log("error"));

// Use body-parser middleware to parse JSON bodies in incoming requests
app.use(bodyParser.json());

// Define routes for handling different API endpoints
app.use("/api/user", userRoutes); // Use authRoutes to handle all /api/auth routes
app.use("/api/posts", postRoutes); // Use postRoutes to handle all /api/posts routes

// Define the port number on which the server will listen, using an environment variable or defaulting to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port, logging a message to confirm it's running
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
