// Import the User model
const User = require("../models/userModel");

// Logout function: clears the user's authentication cookie
const logoutUser = (req, res) => {
	try {
		// Clear the cookie that holds the authentication token
		res.clearCookie("token");

		// Send a success response back to the client
		return res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		// If something goes wrong, send a server error response
		return res.status(500).json({ message: "Error logging out", error });
	}
};

// Delete user function: removes user from the database and clears the authentication cookie
const deleteUser = async (req, res) => {
	try {
		// Assuming that you have a middleware that sets req.user.id (e.g., from JWT)
		const userId = req.user.id;

		// Try to find the user by their ID and delete them from the database
		const deletedUser = await User.findByIdAndDelete(userId);

		// If the user doesn't exist, return a 404 (Not Found) response
		if (!deletedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		// Clear the authentication cookie after user deletion
		res.clearCookie("token");

		// Send a success response indicating the user was deleted
		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		// If something fails during the delete process, send a server error response
		return res.status(500).json({ message: "Error deleting user", error });
	}
};

// Export the controller functions for use in routes
module.exports = {
	logoutUser, // Export logoutUser function
	deleteUser, // Export deleteUser function
};
