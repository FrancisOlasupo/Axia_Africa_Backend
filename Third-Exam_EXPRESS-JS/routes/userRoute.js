const express = require("express"); //import express from node_module
const router = express.Router(); //create an instance of the router
const { register, login } = require("../controllers/userController"); /// import user controller

router.post("/register-new-use", register); //http post request
router.post("/login", login); //http post request

module.exports = router; //export the router to interact with the main app
