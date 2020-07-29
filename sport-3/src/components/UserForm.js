import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { navigate } from "@reach/router";
import "./form.css";

const UserForm = (props) => {
  // keeping track of what is being typed
  const {
    initialFirstname,
    initialLastname,
    initialEmail,
    initialPassword,
    onSubmitProp,
  } = props;
  const [firstname, setfirstname] = useState(initialFirstname);
  const [lastname, setlastname] = useState(initialLastname);
  const [email, setemail] = useState(initialEmail);
  const [password, setpassword] = useState(initialPassword);
  const [loginpassword, setloginpassword] = useState("");
  const [loginemail, setloginemail] = useState("");
  const [errors, seterrors] = useState([]);

  // handle upon form submition
  const create = (e) => {
    e.preventDefault();
    onSubmitProp({ firstname, lastname, email, password });
    // props.addUser({ firstname, lastname });

    const newUser = { firstname, lastname, email, password };
    console.log(1, newUser);

    setfirstname("");
    setlastname("");
    setemail("");
    setpassword("");

    //making post request to create a new person
    axios
      .post("http://localhost:8000/api/create", newUser, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("I'm here", res);
        if (res.data.errors) {
          seterrors(res.data.errors);
        } else {
          console.log("we are here !!!!!!");
          navigate(`/userpage/${res.data._id}`);
        }
      })
      .catch((error) => console.log(error));
    //   .then((res) => {
    //     console.log(5, res);
    //     if (res.data.errors) {
    //       console.log(res.data.errors);
    //     } else {
    //       navigate("/");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     //this line below is getting error data from err.rspn.data
    //     const errorResponse = error.response.data.errors;
    //     //giving a temp err array or dict to store or push messages into
    //     const errorArray = [];
    //     //looping thru all the errors and getting the message
    //     for (const x of Object.keys(errorResponse)) {
    //       errorArray.push(errorResponse[x].message);
    //     }
    //     //then set the errors
    //     seterrors(errorArray);
    //   });
  };

  const login = (e) => {
    e.preventDefault();

    setloginpassword("");
    setloginemail("");

    axios
      .post(
        "http://localhost:8000/api/login",
        { loginemail, loginpassword },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/gamesdashboard");
        seterrors(res.data.errors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="jumbotron jumbotron-fluid">
        <h3>Welcome Animal Shelter</h3>
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="card bg-light mb-3">
            <div className="card-header bg-warning">Register</div>
            <div class="card-body">
              <form onSubmit={create}>
                {/* {errors.map((error, i) => (
                  <p key={i}>{error}</p>
                ))} */}
                <div className="form-group">
                  <label for="firstname">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    aria-describedby="firstname"
                    onChange={(e) => setfirstname(e.target.value)}
                    value={firstname}
                  />
                  {errors.firstname ? (
                    <p className="text-danger">
                      {errors.firstname.properties.message}
                    </p>
                  ) : (
                    ""
                  )}

                  <small
                    id="firstname"
                    className="form-text text-muted"
                  ></small>
                </div>

                <div className="form-group">
                  <label for="lastname">Last name</label>
                  <input
                    type="lastname"
                    className="form-control"
                    id="lastname"
                    aria-describedby="lastname"
                    onChange={(e) => setlastname(e.target.value)}
                    value={lastname}
                  />
                  {errors.lastname ? (
                    <p className="text-danger">
                      {errors.lastname.properties.message}
                    </p>
                  ) : (
                    ""
                  )}
                  <small id="lastname" className="form-text text-muted"></small>
                </div>

                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    aria-describedby="email"
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                  />
                  {errors.email ? (
                    <p className="text-danger">
                      {errors.email.properties.message}
                    </p>
                  ) : (
                    ""
                  )}
                  <small id="email" className="form-text text-muted"></small>
                </div>

                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    aria-describedby="password"
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                  />
                  {errors.password ? (
                    <p className="text-danger">
                      {errors.password.properties.message}
                    </p>
                  ) : (
                    ""
                  )}
                  <small id="password" className="form-text text-muted"></small>
                </div>

                <button type="submit" className="btn btn-outline-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card bg-light mb-3">
            <div className="card-header bg-warning">Log In</div>
            <div class="card-body">
              <form onSubmit={login}>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="email"
                    onChange={(e) => setloginemail(e.target.value)}
                    value={loginemail}
                  />
                  {errors.loginemail ? (
                    <p className="text-danger">
                      {errors.loginemail.properties.message}
                    </p>
                  ) : (
                    ""
                  )}
                  <small id="email" className="form-text text-muted"></small>
                </div>

                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    aria-describedby="password"
                    onChange={(e) => setloginpassword(e.target.value)}
                    value={loginpassword}
                  />
                  {errors.loginpassword ? (
                    <p className="text-danger">
                      {errors.loginpassword.properties.message}
                    </p>
                  ) : (
                    ""
                  )}
                  <small id="password" className="form-text text-muted"></small>
                </div>
                <button type="submit" className="btn btn-outline-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
