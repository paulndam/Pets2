import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { navigate } from "@reach/router";
import "./form.css";

const GameForm = (props) => {
  const {
    initialName,
    initialType,
    initialDescription,
    initialSkills1,
    initialSkills2,
    initialSkills3,
    onSubmitProp,
  } = props;

  const [Name, setName] = useState(initialName);
  const [Type, setType] = useState(initialType);
  const [Description, setDescription] = useState(initialDescription);
  const [Skills1, setSkills1] = useState(initialSkills1);
  const [Skills2, setSkills2] = useState(initialSkills2);
  const [Skills3, setSkills3] = useState(initialSkills3);
  const [errors, seterrors] = useState([]);

  const createpet = (e) => {
    e.preventDefault();
    onSubmitProp({ Name, Type, Description, Skills1, Skills2 });
    const newGame = { Name, Type, Description, Skills1, Skills2, Skills3 };
    console.log(1, newGame);

    setName("");
    setType("");
    setDescription("");
    setSkills1("");
    setSkills2("");
    setSkills3("");

    axios
      .post("http://localhost:8000/api/createPet", newGame)
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          seterrors(res.data.errors);
        } else {
          navigate(`/userpage/${props._id}`);
          navigate("/petsdashboard");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container-fluid">
      <div className="jumbotron jumbotron-fluid">
        <h3>Let's Adopt</h3>
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="card bg-light mb-3">
            <div className="card-header bg-warning">Add Pet</div>
            <div class="card-body">
              <form className="col-sm-8 offset-sm-2" onSubmit={createpet}>
                {/* {errors.map((error, i) => (
                  <p key={i}>{error}</p>
                ))} */}
                <div className="form-group">
                  <label for="Name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Name"
                    aria-describedby="Name"
                    onChange={(e) => setName(e.target.value)}
                    // value={Name}
                  />
                  {errors.Name ? (
                    <p className="text-danger">
                      {errors.Name.properties.message}
                    </p>
                  ) : (
                    ""
                  )}

                  <small id="Name" className="form-text text-muted"></small>
                </div>

                <div className="form-group">
                  <label for="Type">Type</label>
                  <input
                    type="Type"
                    className="form-control"
                    id="Type"
                    aria-describedby="Type"
                    onChange={(e) => setType(e.target.value)}
                    // value={Type}
                  />
                  {errors.Type ? (
                    <p className="text-danger">
                      {errors.Type.properties.message}
                    </p>
                  ) : (
                    ""
                  )}
                  <small id="Type" className="form-text text-muted"></small>
                </div>

                <div className="form-group">
                  <label for="Description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Description"
                    aria-describedby="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    // value={Description}
                  />
                  {errors.Description ? (
                    <p className="text-danger">
                      {errors.Description.properties.message}
                    </p>
                  ) : (
                    ""
                  )}
                  <small
                    id="Description"
                    className="form-text text-muted"
                  ></small>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label for="Skills1">Skills1</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Skills1"
                        aria-describedby="Skills1"
                        onChange={(e) => setSkills1(e.target.value)}
                        // value={Skills1}
                      />
                      {errors.Skills1 ? (
                        <p className="text-danger">
                          {errors.Skills1.properties.message}
                        </p>
                      ) : (
                        ""
                      )}
                      <small
                        id="Skills1"
                        className="form-text text-muted"
                      ></small>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label for="Skills2">Skills2</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Skills2"
                        aria-describedby="Skills2"
                        onChange={(e) => setSkills2(e.target.value)}
                        // value={Skills2}
                      />
                      {errors.Skills2 ? (
                        <p className="text-danger">
                          {errors.Skills2.properties.message}
                        </p>
                      ) : (
                        ""
                      )}
                      <small
                        id="Skills2"
                        className="form-text text-muted"
                      ></small>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label for="Skills3">Skills3</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Skills3"
                        aria-describedby="Skills3"
                        onChange={(e) => setSkills3(e.target.value)}
                        // value={Skills3}
                      />
                      {errors.Skills3 ? (
                        <p className="text-danger">
                          {errors.Skills3.properties.message}
                        </p>
                      ) : (
                        ""
                      )}
                      <small
                        id="Skills3"
                        className="form-text text-muted"
                      ></small>
                    </div>
                  </div>
                </div>

                {/* <div className="col-sm-12">
                  <div className="form-group">
                    <label>Units</label>
                    <select
                      className="form-control"
                      onChange={(e) => setUnits(e.target.value)}
                    >
                      <option>minutes</option>
                      <option>hours</option>
                      <option>days</option>
                    </select>
                  </div>
                </div> */}

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

export default GameForm;
