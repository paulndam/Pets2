import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";

export default (props) => {
  const [pets, setpets] = useState([]);

  const getallpets = () => {
    axios
      .get("http://localhost:8000/api/allPets")
      .then((res) => {
        console.log(res);
        setpets(res.data.Pets);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getallpets();
  }, []);

  const removePet = (_id) => {
    console.log(_id);
    axios
      .delete(`http://localhost:8000/api/allPets/delete/${_id}`)
      .then((res) => {
        console.log(res);
        getallpets();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-around">
        <div id="colone" className="col">
          <div className="">
            <Link
              className="class=btn btn-primary btn-sm"
              type="button"
              to={"/createpet"}
            >
              Add Pet
            </Link>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th>

                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((x, i) => (
                <tr key={x._id}>
                  <td>{x.Name}</td>
                  <td>{x.Type}</td>
                  <td>{x.Description}</td>
                  {/* <td>{x.Duration}</td>
                  <td>{x.Units}</td> */}
                  <Link
                    className="btn btn-outline-warning"
                    to={`/edit/${x._id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-outline-primary"
                    to={`/details/${x._id}`}
                  >
                    details
                  </Link>
                  <button
                    className="btn btn-outline-danger float-right"
                    onClick={(e) => removePet(x._id)}
                  >
                    Adopt
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
