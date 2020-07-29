const mongoose = require("mongoose");

module.exports = (DB_name) => {
  mongoose
    .connect("mongodb://localhost/JokesDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log(`connection established with ${DB_name}`))
    .catch((err) => console.log("error error, DB not connected"));
};
