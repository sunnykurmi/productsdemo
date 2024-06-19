const express = require("express");
const {
  homepage,
  currentuser,
  usersignup,
  checkout,
  paymentverify,
  usersignin,
  key,
  usersignout,
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//post /student
router.get("/home", isAuthenticated, currentuser);

//post//signup
router.post("/signup", usersignup);

//post//signup
router.post("/", usersignin);

//get//signout
router.get("/signout", isAuthenticated, usersignout);

//get//signout
router.get("/key", key);
router.post("/checkout", checkout);
router.post("/paymentverify", paymentverify);



module.exports = router;
