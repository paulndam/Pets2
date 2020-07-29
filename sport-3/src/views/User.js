import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import UserForm from "../components/UserForm.js";

export default () => {
  const [user, setuser] = useState([]);
  const [loaded, setloaded] = useState(false);
  useEffect(() => {
    axios
      .get("https://localhost:8000/api/allusers")
      .then((res) => setuser(res.data));
    setloaded(true);
  }, []);
  const removeFromDom = (userId) => {
    setuser(user.filter((u) => u._id !== userId));
  };

  const createUser = (user) => {
    axios.post("http://localhost:8000/api/create", user).then((res) => {
      setuser([...user, res.data]);
    });
  };
  //We are loading all of the people in our main, and only outputting the list of people once we have gotten a response from the api.
  return (
    <div className="container-fluid">
      {/* <h3>message from rico {message}</h3> */}
      <UserForm
        onSubmitProp={createUser}
        initialFirstname=""
        initialLastname=""
        initialEmail=""
        initialPassword=""
      />
      {loaded && <UserList user={user} removeFromDom={removeFromDom} />}
    </div>
  );
};
