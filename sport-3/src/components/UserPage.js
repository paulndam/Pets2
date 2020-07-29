import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "@reach/router";
import "./userpage.css";
import io from "socket.io-client";
import { navigate } from "@reach/router";

export default (props) => {
  const [user, setuser] = useState({});
  const [game, setgame] = useState({});
  //passing callback function to initialize socket
  const [socket] = useState(() => io(":8000"));
  useEffect((_id) => {
    console.log("RIIIICCCCOOOOO");
    console.log(props._id);
    axios
      .get("http://localhost:8000/api/singleuser/" + props._id)
      .then((res) => {
        console.log(res);
        setuser(res.data);
        setgame(res.data);
      })
      .catch((err) => console.log(err));
    //setting up our event listeners
    // console.log("Is this running?");
    // socket.on("Welcome, Rico welcome's you", (data) => console.log(data));
    // return () => socket.disconnect(true);
  }, []);

  // useEffect(() => {
  //   console.log("Is this running?");
  //   socket.on("Welcome, Rico welcome's you", (data) => console.log(data));
  //   return () => socket.disconnect(true);
  // });

  // useEffect(() => {
  //   console.log("TIIIICCCCOOOOO");
  //   console.log(props._id);
  //   axios
  //     .get("http://localhost:8000/api/onegame/" + props._id)
  //     .then((res) => {
  //       console.log(res);
  //       setgame(res.data);
  //       setuser(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const removeUser = (_id) => {
    console.log(_id);
    axios
      .delete(`http://localhost:/8000/api/singleuser/${_id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const theLogedInUser = () => {
    axios
      .get("http://localhost:8000/api/user/userlogin", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/singleuser/" + props._id, {
        withCredentials: true,
      })
      .then((res) => {
        setuser(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log("not authorized");
        console.log(err);

        navigate("/");
      });
  }, []);

  return (
    <div className="container-fluid">
      <div class="row justify-content-start">
        <div className="col">
          <div className="card bg-dark text-white">
            <div className="card-header">Hello {user.firstname}</div>
            <div className="card-body">
              <p>last name: {user.lastname}</p>
              {/* <Link
                className="btn btn-outline-warning"
                to={`/edit/${user._id}`}
              >
                Edit
              </Link>
              <button
                className="btn btn-outline-danger float-right"
                onClick={(e) => removeUser(user._id)}
              >
                Remove
              </button> */}
            </div>
          </div>
        </div>
        <div className="col">
          <Link
            className="class=btn btn-primary btn-sm"
            type="button"
            to={"/createpet"}
          >
            Add Pet
          </Link>

          <Link
            className="class=btn btn-info btn-sm"
            type="button"
            to={"/petsdashboard"}
          >
            All Pets
          </Link>
        </div>
      </div>

      <div className="row justify-content-around">
        <div id="colone" className="col">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                {/* <th scope="col">Home Team</th>
                <th scope="col">Away Team</th>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">Units</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>{game.TeamOneName}</td>
                <td>{game.TeamTwoName}</td>
                <td>{game.Description}</td>
                <td>{game.Duration}</td>
                <td>{game.Units}</td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
