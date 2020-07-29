require("dotenv").config();

const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const DB_name = "sport_db3";

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const myFirstSecret = process.env.FIRST_SECRET_KEY;
console.log("logging the secret below");
console.log(myFirstSecret);
//initializing DB connection with mongoose
require("./server/config/mongoose.js");

//import our user route function from user.routes.js
const AllUserRoutes = require("./server/routes/user.route.js")(app);

//import our config route as well
const DBconnection = require("./server/config/mongoose.js")(DB_name);
const server = app.listen(process.env.DB_PORT, () =>
  console.log(`Listening on port: ${process.env.DB_PORT}`)
);

// to initialize socket.io we need to require and instanciate it

const io = require("socket.io")(server);

// now set ena event listerner to pass data between our server and client
// the even listener is named connection

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("event_from_client", (data) => {
    socket.broadcast.emit("send_data_to_other_clients", data);
  });
});

//trying to send an event from the server to the client
io.on("connect", (socket) => {
  let counter = 0;
  setInterval(() => {
    socket.emit("waazzzzaaaapppp", ++counter);
  }, 1000);
});

//sendinh a message from the client to the server
io.on("connect", (socket) => {
  socket.on("hey", (data) => {
    console.log("hey", data);
  });
});
