console.log("pet.controller.js");

//importing my jokes.model from model and setting it into our controller

const Pet = require("../models/pet.model");
const jwt = require("jsonwebtoken");

module.exports.index = (req, res) => {
  res.json({ message: "Hello Rico Pet" });
};

//method creating new user

module.exports.index = (req, res) => {
  res.json({ message: "Hello Rico Pet" });
};

//method creating user is here now my friend

module.exports.createPet = (req, res) => {
  console.log(req.body);
  const { Name, Type, Description, Skills1, Skills2, Skills3, Like } = req.body;
  Pet.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

module.exports.allPets = (req, res) => {
  console.log(req.body);
  Pet.find({})
    .sort("Type")
    .then((allPets) => res.json({ Pets: allPets }))
    .catch((err) => res.json({ message: err.message }));
};

module.exports.onePet = (req, res) => {
  console.log(req.body);
  Pet.findOne({ _id: req.params._id })
    .then((onePet) => res.json(onePet))
    .catch((err) => res.json({ message: err.message }));
};

// updating

module.exports.UpdatePet = (req, res) => {
  Pet.findOneAndUpdate(
    { _id: req.params._id },
    req.body,
    // { new: true },
    { runValidators: true }
  )
    .then((result) => res.json({ result: result }))
    .catch((err) => res.json({ message: "something went wrong", error: err }));
};

module.exports.DeletePet = (req, res) => {
  console.log(req.params._id);
  Pet.deleteOne({ _id: req.params._id })
    .then((deletePet) => res.json({ user: deletePet }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};
