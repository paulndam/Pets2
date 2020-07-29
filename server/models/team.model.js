//mongoose will still need to be required here
console.log("team.model.js");
const mongoose = require("mongoose");

//making new schema instance of our jokes

const TeamSchema = new mongoose.Schema(
  {
    TeamName: {
      type: String,
      required: [true, "team name line is required"],
      minlength: [3, " team name gotta be at least 3 characters"],
    },
    Location: {
      type: String,
      required: [true, "location line is required"],
      minlength: [3, "location gotta be at least 3 characters"],
    },
    Stadium: {
      type: String,
      required: [true, "stadium is required"],
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);

module.exports = TeamSchema;
