import logo from "./logo.svg";
import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SplitPane from "react-split-pane";
import { connect } from "react-redux";

import { useSelector, useDispatch } from "react-redux";

//   return (
//     <div className="App">

//       <button onClick={() => dispatch(increment(5))}>+</button>
//       <button onClick={() => dispatch(decrement())}>-</button>
//     </div>
//   );
// }
import simpleAction from "./store/actions/simpleaction";
import Search from "./components/Student_Search/Search";
function App() {
  const result = useSelector((state) => state.simpleReducer.result);
  const dispatch = useDispatch();
  console.log(result);
  return (
    <div className="App container mt-5">
      <header className="App-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* {result}
          <button
            className="btn btn-primary btn-circle btn-xl"
            style={{ borderRadius: "45%" }}
            onClick={() => dispatch(simpleAction())}
          >
            Add
          </button> */}
          <ul
            style={{
              listStyleType: "none",
              margin: "auto",
            }}
          >
            <li
              style={{
                margin: "auto",
              }}
            >
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
const mapStateToProps = (state) => ({
  result: state.result,
});

export default connect(mapStateToProps)(App);
