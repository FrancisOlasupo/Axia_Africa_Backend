"use strict";

const express = require("express"); // import express library from node_modules
const app = express(); // creating an instance of the express application
const dotenv = require("dotenv"); // importing dotenv from node_module
dotenv.config(); // configuring dotenv
const mongoose = require("mongoose"); // Import mongoose for database connection
const bodyParser = require("body-parser"); // Import body-parser to parse request bodies
const session = require("express-session"); // Import express-session for session management
const passport = require("./config/passportConfig"); // Import Passport configuration
const userRoutes = require("./routes/userRoute"); // Import authentication routes for handling user registration and login
const postRoutes = require("./routes/postRoute"); // Import post routes for handling post-related actions
const authRoutes = require("./routes/auth"); // Import authentication routes for logout and delete user

// Connect to MongoDB using mongoose
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("connected successfully"))
	.catch(() => console.log("error"));

// Use body-parser middleware to parse JSON bodies in incoming requests
app.use(bodyParser.json());

// Use express-session middleware to manage sessions
app.use(
	session({
		secret: "yourSecretKey", // Replace with a strong secret key
		resave: false,
		saveUninitialized: false,
	})
);

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session()); // Use session to maintain authentication state

// Define routes for handling different API endpoints
app.use("/api/user", userRoutes); // Use userRoutes to handle all /api/user routes
app.use("/api/posts", postRoutes); // Use postRoutes to handle all /api/posts routes
app.use("/api/auth", authRoutes); // Use authRoutes to handle all /api/auth routes (logout and delete user)

// Define the port number on which the server will listen, using an environment variable or defaulting to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port, logging a message to confirm it's running
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
