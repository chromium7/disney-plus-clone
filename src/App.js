import "./App.css";

import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Details from "./components/Detail";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/detail">
            <Details />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
