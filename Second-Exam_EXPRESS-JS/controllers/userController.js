const bcrypt = require("bcryptjs"); // Step 1: Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Step 2: Import JWT for token generation
const User = require("../models/User"); // Step 3: Import the User model for the logic to interact with the database

// Step 4: create the constant register variable to store the asynchronous function to handle user registration
const register = async (req, res) => {
	const { name, email, password, department, yearOfStudy } = req.body; // Step 5: destructure user details from the client's request body

	try {
		const hashedPassword = await bcrypt.hash(password, 10); // Step 6: Hash the user's password before storing it in the database
		// Step 7: Create a new user instance with the hashed password and other details
		const user = new User({
			name,
			email,
			password: hashedPassword,
			department,
			yearOfStudy,
		});
		const savedUser = await user.save(); // Step 8: Save the new user to the database
		res.status(201).json({ message: "User registered successfully" }); // Step 9: Send a success response indicating the user has been registered
	} catch (error) {
		// Step 10: Handle any errors that occur during registration
		res.status(500).json({ error: error.message });
	}
};

// Step 11:create a constant variable to store the login function that handles user login
const login = async (req, res) => {
	const { email, password } = req.body; // Step 12: destructure the login details from the client's request body

	// Step 13: Find the user in the database by their email
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ message: "User not found" });

		// Step 14: Check if the user's password matches the hashed password in the database
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });

		// Step 15: Generate a JWT token for the user if the password matches
		const token = jwt.sign({ id: user._id }, "secretKey", {
			expiresIn: "1h", // Token expires in 1 hour
		});

		// Step 16: Send the JWT token in the response
		res.json({ token });
	} catch (error) {
		// Step 17: Handle any errors that occur during login
		res.status(500).json({ error: error.message });
	}
};

// Step 18: Export the register and login functions
module.exports = { register, login };
