import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SplitPane from "react-split-pane";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Container, Button } from "react-bootstrap";

import SearchAction from "./store/actions/SearchAction";
import Search from "./components/Student_Search/Search";
import Classes from "./components/Classes/index";

import { useEffect, useState } from "react";

import {
  Sidebar,
  InputItem,
  DropdownItem,
  Icon,
  Item,
  Logo,
  LogoText,
} from "react-sidebar-ui";
import { WrapApp, ForSide } from "./style";

const App = () => {
  const [SearchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [sidebarclass, setSideBarClass] = useState("");

  const searchInput = useSelector((state) => {
    return state.Searching.search;
  });

  console.log(searchInput);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper d-flex align-items-stretch">
      <nav id="sidebar" className={sidebarclass}>
        <h2 className="text-center mt-3">LMS</h2>
        <div className="p-4 pt-2">
          <ul className="list-unstyled components mb-5">
            <li className="active">
              <a href="/">Search</a>
            </li>

            <li>
              <a href="/submission">Submission</a>
            </li>
            <li>
              <a href="/classes">Classes</a>
            </li>
            <li>
              <a href="/attendance">Attendance</a>
            </li>
          </ul>

          <div className="footer">Copyright &copy; All rights reserved</div>
        </div>
      </nav>

      <div id="content" className="p-4 p-md-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ForSide sidebarclass={sidebarclass}>
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-primary"
              onClick={() => {
                if (sidebarclass == "") setSideBarClass("active");
                else setSideBarClass("");
              }}
            >
              <i className="fa fa-bars"></i>
              <span className="sr-only">Toggle Menu</span>
            </button>
          </ForSide>
          <Col md="auto" className="sm-hide">
            <input
              type="text"
              placeholder="Search"
              required
              onChange={handleChange}
            />
            <button
              className="btn btn-primary btn-circle btn-xl ml-2"
              style={{ borderRadius: "50%" }}
              onClick={() => dispatch(SearchAction(SearchValue))}
            >
              Search
            </button>
          </Col>
          <Col lg="2" className="lg-hide"></Col>
        </nav>
        <div
          style={{
            display: "grid",
            justifyContent: "center",
          }}
          className=" mt-3"
        >
          <Row className="justify-content-md-center lg-hide text-center">
            <Col md="auto">
              <input
                type="text"
                placeholder="Search"
                required
                onChange={handleChange}
              />
              <button
                className="btn btn-primary btn-circle btn-xl ml-2"
                style={{ borderRadius: "50%" }}
                onClick={() => dispatch(SearchAction(SearchValue))}
              >
                Search
              </button>
            </Col>
          </Row>
        </div>

        <Router>
          <Switch>
            <Route exact path="/">
              <Search />
            </Route>
            <Route path="/submission"></Route>
            <Route path="/attendance">kjn</Route>
            <Route path="/classes">
              <Classes />
            </Route>

            <Route path="/admincontroller">kjn</Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  search: state.search,
  ID: state.ID,
});

export default connect(mapStateToProps)(App);
