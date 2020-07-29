import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import moment from "moment";

const EditGame = (props) => {
  //   const { _id } = props;
  //   const [game, setgame] = useState();
  //const [errors, seterrors] = useState({});
  //const [loaded, setLoaded] = useState(false);

  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:8000/api/allgames/${props._id}`)
  //       .then((res) => {
  //         console.log(res);
  //         setgame(res.data.games);
  //         setLoaded(true);
  //       })
  //       .catch((error) => console.log(error));
  //   }, [props._id]);

  //   const updateGame = (game) => {
  //     axios
  //       .put(`http://localhost:8000/api/allgames/update/${props._id}`, game)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data.errors) {
  //           seterrors(res.data.errors);
  //         } else {
  //           navigate("/gamesdashboard");
  //         }
  //       })
  //       .catch((error) => console.log(error));
  //   };

  const [Name, setName] = useState("");
  const [Type, setType] = useState("");
  const [Description, setDescription] = useState("");
  const [Skills1, setSkills1] = useState("");
  const [Skills2, setSkills2] = useState("");
  const [Skills3, setSkills3] = useState("");
  const [errors, seterrors] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/onePet/${props._id}`)
      .then((res) => {
        console.log(res);
        setName(res.data.Name);
        setType(res.data.Type);
        setDescription(res.data.Description);
        setSkills1(res.data.Skills1);
        setSkills2(res.data.Skills2);
        setSkills3(res.data.Skills3);
      })
      .catch((errors) => console.log(errors.message));
  }, [props._id]);

  //method to update

  const updatePet = (e) => {
    e.preventDefault();
    const gamex = { Name, Type, Description, Skills1, Skills2, Skills3 };
    console.log("the pur request route below");
    console.log(`http://localhost:8000/api/allPets/update/${props._id}`);
    axios
      .put(`http://localhost:8000/api/allPets/update/${props._id}`, gamex)
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          seterrors(res.data.error.errors);
        } else {
          navigate("/petsdashboard");
        }
      })
      .catch((error) => console.log(errors.message));
  };

  const removeGame = () => {
    axios
      .delete(`http://localhost:8000/api/allPets/delete/${props._id}`)
      .then((res) => {
        console.log(res);
        navigate("/petsdashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    // <div className="container-fluid">
    //   {loaded && (
    //     <GameForm
    //       onSubmitProp="updatePet"
    //       initialName={game.Name}
    //       initialType={game.Type}
    //       initialDescription={game.Description}
    //       initialSkills1={game.Skills1}
    //       initialSkills2={game.Skills2}
    //     />
    //   )}
    // </div>
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="card bg-light mb-3">
            <div className="card-header bg-warning">Update Game</div>
            <div class="card-body">
              <form className="col-sm-8 offset-sm-2" onSubmit={updatePet}>
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
                    value={Name}
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
                    value={Type}
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
                    value={Description}
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
                        value={Skills1}
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
                        value={Skills2}
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
                        value={Skills3}
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

export default EditGame;
