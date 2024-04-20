const express = require("express");

const router = express.Router();
const authcontrollers = require("../controllers/auth-controller")

router.route("/").get(authcontrollers.home);
router.route("/register").post(authcontrollers.register);//name,email,password
router.route("/login").post(authcontrollers.login);//email,password
router.route("/profile").put(authcontrollers.profile);//upload profile picture
router.route("/course").get(authcontrollers.course);//available courses 
router.route("/enrolled").get(authcontrollers.enrolled);//couses enrolled into


module.exports=router;