import logo from "./logo.svg";
import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SplitPane from "react-split-pane";

import Search from "./components/Student_Search/Search";
function App() {
  return (
    <div className="App container mt-2">
      <header className="App-header">
        <div>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <a href="/">Students</a>
            </li>
            <li>
              <a href="/submission">Submission</a>
            </li>
            <li>
              <a href="/attendance">Attendance</a>
            </li>
            <li>
              <a href="/admincontroller">Admin Controller</a>
            </li>
          </ul>
        </div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Search />
            </Route>
            <Route path="/submission"></Route>
            <Route path="/attendance">kjn</Route>
            <Route path="/admincontroller">kjn</Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
