console.log("pet.model.js");
const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, " name line is required"],
      minlength: [3, " gotta be at least 3 characters"],
      unique: [true],
    },
    Type: {
      type: String,
      required: [true, "type line is required"],
      minlength: [3, " gotta be at least 3 characters"],
    },
    Description: {
      type: String,
      required: [true, "description line is required"],
    },
    Skills1: {
      type: String,
      // required: [true, "Skills1 is required"],
      // min: [0, "can't be less than 0"],
    },
    Skills2: {
      type: String,
      // required: [true, "Skills2 is required"],
      // min: [0, "can't be less than 0"],
    },
    Skills3: {
      type: String,
      // required: [true, "Skills3 is required"],
      // min: [0, "can't be less than 0"],
    },

    Like: {
      type: String,
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
