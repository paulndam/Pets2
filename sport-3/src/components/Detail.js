import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "@reach/router";
import "./userpage.css";
import io from "socket.io-client";
import { navigate } from "@reach/router";

export default (props) => {
  const [Pets, setPets] = useState({});
  //const [game, setgame] = useState({});
  //passing callback function to initialize socket
  const [socket] = useState(() => io(":8000"));
  useEffect((_id) => {
    console.log("RIIIICCCCOOOOO");
    console.log(props._id);
    axios
      .get("http://localhost:8000/api/onePet/" + props._id)
      .then((res) => {
        console.log(res);
        setPets(res.data);
      })
      .catch((err) => console.log(err));
    //setting up our event listeners
    // console.log("Is this running?");
    // socket.on("Welcome, Rico welcome's you", (data) => console.log(data));
    // return () => socket.disconnect(true);
  }, []);

  //   useEffect(() => {
  //     console.log("Is this running?");
  //     socket.on("Welcome, Rico welcome's you", (data) => console.log(data));
  //     return () => socket.disconnect(true);
  //   });

  // useEffect(() => {
  //   console.log("TIIIICCCCOOOOO");
  //   console.log(props._id);
  //   axios
  //     .get("http://localhost:8000/api/onegame/" + props._id)
  //     .then((res) => {
  //       console.log(res);
  //       setgame(res.data);
  //       setPets(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const removePets = (e) => {
    console.log();
    axios
      .delete(`http://localhost:8000/api/allPets/delete/${props._id}`)
      .then((res) => {
        console.log(res);
        navigate("/petsdashboard");
      })
      .catch((error) => console.log(error));
  };

  const like = 0;
  function newLike() {
    return like++;
  }

  const Like = (likes) => {
    likes = 0;
    return likes++;
  };
  //   const theLogedInPets = () => {
  //     axios
  //       .get("http://localhost:8000/api/Pets/Petslogin", {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8000/api/singlePets/" + props._id, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         setPets(res.data);
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log("not authorized");
  //         console.log(err);

  //         navigate("/");
  //       });
  //   }, []);

  return (
    <div className="container-fluid">
      <div class="row justify-content-start">
        <div className="col">
          <div className="card bg-dark text-white">
            <div className="card-header">Details About {Pets.Name}</div>
            <div className="card-body">
              <p>Pet Type: {Pets.Type}</p>
              <p>Pet Description: {Pets.Description}</p>
              <p>Pet Skills1: {Pets.Skills1}</p>
              <p>Pet Skills2: {Pets.Skills2}</p>
              <p>Pet Skills3: {Pets.Skills3}</p>

              {/* <Link
                className="btn btn-outline-warning"
                to={`/edit/${Pets._id}`}
              >
                Edit
              </Link>
              <button
                className="btn btn-outline-danger float-right"
                onClick={(e) => removePets(Pets._id)}
              >
                Remove
              </button> */}
              <div className="card-title">
                <button
                  className="btn btn-outline-warning float-right"
                  onClick={(e) => removePets()}
                >
                  Adopt
                </button>
              </div>

              <div className="card-title">
                <button
                  className="btn btn-outline-warning float-right"
                  onClick={(e) => Like()}
                >
                  like
                </button>
              </div>
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
