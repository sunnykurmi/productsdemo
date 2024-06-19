const { catchError } = require("../middlewares/catchError");
const usermodel = require("../models/usermodel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const Razorpay = require('razorpay');
require("dotenv").config({ path: "../.env" });


exports.usersignup = catchError(async (req, res, next) => {
  const newUser = await new usermodel(req.body).save();
  sendtoken(newUser, 201, res);
});


exports.currentuser = catchError(async (req, res, next) => {
  const loggedinuser = await usermodel
    .findById(req.id)
    .exec();
  res.json({ loggedinuser });
});

exports.usersignin = catchError(async (req, res, next) => {
  const founduser = await usermodel
    .findOne({
      email: req.body.email,
    })
    .select("+password")
    .exec();
  if (!founduser)
    return next(
      new ErrorHandler("user not found with this email address ", 404)
    );
  const ismatched = founduser.comparepassword(req.body.password);
  if (!ismatched) return next(new ErrorHandler(" wrong credentials ", 500));
  sendtoken(founduser, 200, res);
});

exports.usersignout = catchError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signed out" });
});



const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.checkout = catchError(async (req, res, next) => {
  var options = {
    amount: Number(req.body.price*100),  // amount in the smallest currency unit
    currency: "INR",
  };
 const order = await instance.orders.create(options);
  res.json(order);
  });


  exports.key = catchError(async (req, res, next) => {
    const key = process.env.RAZORPAY_KEY_ID;
    res.json({ key });
    });

exports.paymentverify = catchError(async (req, res, next) => {
    console.log(req.body);
  });

