// Importing necessary modules
const express = require("express"); //Imports express library from node_module
const router = express.Router(); //creats an instance of the express router
const authController = require("../controllers/authController"); //imports authentication controller file

// POST /auth/logout - Logs the user out by clearing the cookie
router.post("/logout", authController.logoutUser);

// DELETE /auth/delete-user - Deletes the user from the database and clears the cookie
router.delete("/delete-user", authController.deleteUser);

module.exports = router;
