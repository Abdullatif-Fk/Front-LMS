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
import { WrapApp, search } from "./style";

const App = () => {
  const [SearchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => {
    console.log(state);
    return state.Searching.search;
  });

  console.log(searchInput);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <WrapApp className="App-header">
      <Sidebar bgColor="black" isCollapsed={false}>
        <Logo
          image="https://media2.giphy.com/media/eNAsjO55tPbgaor7ma/source.gif"
          imageName="react logo"
        />
        <LogoText>LMS</LogoText>
        <Item bgColor="black" classes="mt-4">
          <Icon>
            <i className="fas fa-home" />
          </Icon>
          <a href="/">Students</a>
        </Item>
        <Item bgColor="black" classes="mt-3">
          <Icon>
            <i className="fas fa-info" />
          </Icon>
          <a href="/submission">Submission</a>
        </Item>
        <Item bgColor="black" classes="mt-3">
          <Icon>
            <i className="fas fa-sitemap" />
          </Icon>
          <a href="/attendance">Attendance</a>
        </Item>
        <Item bgColor="black" classes="mt-3">
          <Icon>
            <i className="far fa-address-book" />
          </Icon>
          <a href="/admincontroller">Admin Controller</a>
        </Item>
      </Sidebar>
      <div></div>
      <div>
        <div
          style={{
            display: "grid",
            justifyContent: "center",
          }}
          className=" mt-3"
        >
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
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
            <Col xs lg="2"></Col>
          </Row>
        </div>
        <Card className="container mr-5 pr-5 pl-5 mt-3 pt-2 bg-light">
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
        </Card>
      </div>
    </WrapApp>
  );
};
const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps)(App);
