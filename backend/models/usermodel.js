const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usermodel = new mongoose.Schema(
  {
    
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      maxLength: [15, "password should not exceed more than 15 characters"],
      minLength: [6, "password should be atleast 6 characters"],
      // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]
    },
  },
  { timestamps: true }
);

usermodel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

usermodel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
usermodel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const user = mongoose.model("user", usermodel);
module.exports = user;