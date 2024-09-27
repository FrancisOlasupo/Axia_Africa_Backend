// Import necessary modules
const passport = require("passport"); // importing Passport.js for handling authentication
const GoogleStrategy = require("passport-google-oauth20").Strategy; // importing Google OAuth strategy
const User = require("../models/user"); // Import the User model

// Use the Google OAuth 2.0 strategy for authentication
passport.use(
	new GoogleStrategy(
		{
			// Set the client ID and secret, retrieved from environment variables for security
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback", // The URL to redirect to after Google authentication
		},
		// This callback is executed after Google provides the user's profile
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Check if a user with this Google ID already exists in the database
				let user = await User.findOne({ googleId: profile.id });

				if (!user) {
					// If the user doesn't exist, create a new user in the database
					user = await new User({
						googleId: profile.id, // Store the Google ID in the user record
						email: profile.emails[0].value, // Use the first email in the user's profile
						name: profile.displayName, // Use the display name provided by Google
					}).save(); // Save the new user to the database
				}

				// Call done with the user object, which will proceed with authentication
				done(null, user);
			} catch (error) {
				// If an error occurs, pass the error to done
				done(error, null);
			}
		}
	)
);

// Passport session handling (if you're using sessions to manage logged-in state)

// Serialize the user to decide what data should be stored in the session
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize the user by retrieving their full data from the database using the stored ID
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user); // Return the user object if found, or an error if not
	});
});

// Export the passport configuration
module.exports = passport;
