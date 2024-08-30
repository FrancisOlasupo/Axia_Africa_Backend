const jwt = require("jsonwebtoken"); // Step 1: Import JWT for token verification

// Step 2: Create a constant variable authenticate to store the middleware function for verifying JWT tokens
const authenticate = (req, res, next) => {
	const token = req.header("Authorization"); // Step 3: Retrieve the token from the request header

	// Step 4: Check if the token is present
	if (!token) {
		return res
			.status(401)
			.json({ message: "No token, authorization denied" }); // Step 5: Send an unauthorized response if no token is found
	}

	try {
		// Step 6: Verify the token using JWT and the secret key
		const decoded = jwt.verify(token, "secretKey"); // Replace 'secretKey' with your actual secret key for production

		req.user = decoded; // Step 7: Attach the decoded user information to the request object

		next(); // Step 8: Call the next middleware function in the stack
	} catch (error) {
		// Step 9: Handle any errors that occur during token verification
		res.status(400).json({ message: "Token is not valid" }); // Step 10: Send a response indicating the token is invalid
	}
};

// Step 11: Export the authenticate function for use in other parts of the application
module.exports = authenticate;
