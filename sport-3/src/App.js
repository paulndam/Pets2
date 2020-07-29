import React from "react";
import UserForm from "./components/UserForm.js";
import UserPage from "./components/UserPage.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Link } from "@reach/router";
import "./App.css";
import GameForm from "./components/GameForm.js";
import GameList from "./components/GameList.js";
import EditGame from "./components/EditGame.js";
import Detail from "./components/Detail.js";

function App() {
  return (
    <div className="container-fluid">
      <Link to="/userpage/:_id"></Link>
      <Router>
        <UserForm onSubmitProp={(u) => console.log(u)} path="/" />
        <GameForm onSubmitProp={(y) => console.log(y)} path="/createpet" />
        <UserPage path="/userpage/:_id" />
        <GameList path="/petsdashboard" />
        <EditGame path="/edit/:_id" />
        <Detail path="/details/:_id" />
      </Router>
    </div>
  );
}

export default App;
