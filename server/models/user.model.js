//mongoose will still need to be required here
console.log("user.model.js");
const mongoose = require("mongoose");
const TeamSchema = require("./team.model.js");
//const PetSchema = require("./pet.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//const GameSchema = require("./game.model.js");

//making new schema instance of our jokes

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname line is required"],
      minlength: [3, " gotta be at least 3 characters"],
    },
    lastname: {
      type: String,
      required: [true, "lastname line is required"],
      minlength: [3, "lastname gotta be at least 3 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email line is required"],
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "enter valid email ",
    },
    password: {
      type: String,
      required: [true, "password line is required"],
    },
    // eamilvalidate: {
    //   type: String,
    //   validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
    //   message: "enter valid email ",
    // },
    teams: [TeamSchema],
    //pets: [PetSchema],
    //games: [GameSchema],
  },
  { timestamps: true }
);

// UserSchema.virtual("confirmpassword")
//   .get(() => this._confirmpassword)
//   .set((value) => (this._confirmpassword = value));

// UserSchema.pre("validate", function (next) {
//   if (this.password !== this.confirmpassword) {
//     this.invalidate("confirmPassword", "Password must match confirm password");
//   }
//   next();
// });

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

// const payload = {
//   id: User._id,
// };

// // notice that we're using the SECRET_KEY from our .env file
// const userToken = jwt.sign(payload, process.env.key_one);

const User = mongoose.model("User", UserSchema);

module.exports = User;
