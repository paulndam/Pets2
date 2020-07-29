console.log("user.controller.js");

//importing my jokes.model from model and setting it into our controller

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.index = (req, res) => {
  res.json({ message: "Hello Rico" });
};

//method creating new user

module.exports.index = (req, res) => {
  res.json({ message: "Hello Rico" });
};

//method creating user is here now my friend

// module.exports.createUser = (req, res) => {
//   console.log(req.body);
//   const { firstname, lastname, email, password } = req.body;
//   User.create({
//     firstname,
//     lastname,
//     email,
//     password,
//   })
//     .then((user) => res.json(user))
//     .catch((err) => res.json(err));
// };
// ...
// register: (req, res) => {
//   User.create(req.body)
//     .then(user => {
//         const userToken = jwt.sign({
//             id: user._id
//         }, process.env.SECRET_KEY);

//         res
//             .cookie("usertoken", userToken, secret, {
//                 httpOnly: true
//             })
//             .json({ msg: "success!", user: user });
//     })
//     .catch(err => res.json(err));
// }
// ...

module.exports.createUser = (req, res) => {
  console.log("in the  creating functiiiooonnnnnnn");
  console.log(req.body);
  const { firstname, lastname, email, password } = req.body;
  User.create(req.body)
    .then((user) => {
      const userToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res
        .cookie("usertoken", userToken, secret, { httpOnly: true })
        .json({ message: "success", user: user });
    })

    .catch((error) => res.json(error));
};
// User.create(req.body)
//     .then(user => {
//         const userToken = jwt.sign({
//             id: user._id
//         }, process.env.SECRET_KEY);

//         res
//             .cookie("usertoken", userToken, secret, {
//                 httpOnly: true
//             })
//             .json({ msg: "success!", user: user });
//     })
//     .catch(err => res.json(err));

//login and cchecking if they are stored in the DB

// module.exports.login = (req, res) => {
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (user === null) {
//         //if the email is not in DB
//         return res.json({ message: "login failed", email: "email not found" });
//       }
//       //if we are on this stage that mean we got the email in the DB and now lets compare the password and hash it
//       const correctpassword = bcrypt.compare(req.body.password, user.password);
//       if (!correctpassword) {
//         //if password didn't match, oh boy
//         return res.json({
//           message: "login invalid",
//           password: "password incorrect",
//         });
//       }
//       //if we got the password !!
//       const userToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//       res
//         .cookie("usertoken", userToken, secret, { httpOnly: true })
//         .json({ message: "success" });
//     })
//     .catch((error) => res.json(error));
// };

//another login method

// module.exports.login = (req, res) => {
//   const { email, password } = req.body;

//   User.findOne(req.body)
//     .then((user) => {
//       if (user === null) {
//         throw new Error("Invalid email and password");
//       } else {
//         bcrypt.compare(password, user.password);
//         res.json({ message: "success", userId: user._id });
//       }
//     })
//     .catch((error) => res.json(error));
// };

module.exports.login = (req, res) => {
  const [email, password] = req.body;
  User.findOne(
    { email: req.body.email }
      .then((user) => {
        if (user === null) {
          res.json({ message: "invalid attempt" });
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then((correctpassword) => {
              if (correctpassword) {
                res
                  .cookie(
                    "usertoken",
                    jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
                    {
                      httpOnly: true,
                    }
                  )
                  .json({ message: "you got it" });
              } else {
                res.json({ message: "invalid login attempt" });
              }
            })
            .catch((error) => res.json({ message: "invalid login attempt" }));
        }
      })
      .catch((error) => res.json(error))
  );
};
// method to run for loggedin

module.exports.getLoggedInUser = (req, res) => {
  const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
  User.findById(decodedJWT.payload._id)
    .then((user) => res.json(user))
    .catch((err) => res.json(error));
};

//creating or adding team

// module.exports.addPet = (req, res) => {
//   User.findByIdAndUpdate(
//     { _id: req.params._id },
//     { $push: { teams: req.body } }
//   )
//     .then((user) => res.json({ msg: "ok" }))
//     .catch((errors) => res.json(errors.message));
// };

module.exports.addTeam = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params._id },
    { $push: { teams: req.body } }
  )
    .then((user) => res.json({ msg: "ok" }))
    .catch((errors) => res.json(errors.message));
};

module.exports.addGame = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params._id },
    { $push: { games: req.body } }
  )
    .then((user) => res.json({ msg: "ok" }))
    .catch((errors) => res.json(errors.message));
};

//getting all users

module.exports.allusers = (req, res) => {
  User.find({})
    .then((allUsers) => res.json({ user: allUsers }))
    .catch((err) => res.json({ message: err.message }));
};

// getting single user
//after this make sure to add another that can a specific user

module.exports.singleuser = (req, res) => {
  User.findOne({ _id: req.params._id })
    .then((user) => res.json(user))
    .catch((err) => res.json({ message: err.message }));
};

// updating

module.exports.UpdateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    req.body,
    { new: true },
    { runValidators: true }
  )
    .then((updateuser) => res.json({ user: updateuser }))
    .catch((err) =>
      res.json({ message: "something went wrong", error: err.message })
    );
};

module.exports.DeleteUser = (req, res) => {
  console.log(req.params._id);
  User.deleteOne({ _id: req.params._id })
    .then((deleteuser) => res.json({ user: deleteuser }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

// module.exports = {
//   register(req, res) {
//     const user = new User(req.body);

//     user
//       .save()
//       .then(() => {
//         res.json({ msg: "success!", user: user });
//       })
//       .catch((err) => res.status(400).json(err));
//   },

//   login(req, res) {
//     User.findOne({ email: req.body.email })
//       .then((user) => {
//         if (user === null) {
//           res.status(400).json({ msg: "invalid login attempt" });
//         } else {
//           bcrypt
//             .compare(req.body.password, user.password)
//             .then((passwordIsValid) => {
//               if (passwordIsValid) {
//                 res
//                   .cookie(
//                     "usertoken",
//                     jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
//                     {
//                       httpOnly: true,
//                     }
//                   )
//                   .json({ msg: "success!" });
//               } else {
//                 res.status(400).json({ msg: "invalid login attempt" });
//               }
//             })
//             .catch((err) =>
//               res.status(400).json({ msg: "invalid login attempt" })
//             );
//         }
//       })
//       .catch((err) => res.json(err));
//   },

//   logout(req, res) {
//     res
//       .cookie("usertoken", jwt.sign({ _id: "" }, process.env.JWT_SECRET), {
//         httpOnly: true,
//         maxAge: 0,
//       })
//       .json({ msg: "ok" });
//   },

//   logout2(req, res) {
//     res.clearCookie("usertoken");
//     res.json({ msg: "usertoken cookie cleared" });
//   },

//   getLoggedInUser(req, res) {
//     const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

//     User.findById(decodedJWT.payload._id)
//       .then((user) => res.json(user))
//       .catch((err) => res.json(err));
//   },

//   getAll(req, res) {
//     User.find()
//       .then((users) => res.json(users))
//       .catch((err) => res.json(err));
//   },

//   getOne(req, res) {
//     User.findOne({ _id: req.params.id })
//       .then((user) => res.json(user))
//       .catch((err) => res.json(err));
//   },
// };
