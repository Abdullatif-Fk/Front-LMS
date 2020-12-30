import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SplitPane from "react-split-pane";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
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

import {
  Sidebar,
  InputItem,
  DropdownItem,
  Icon,
  Item,
  Logo,
  LogoText,
} from "react-sidebar-ui";
import { WrapApp } from "./style";

const App = () => {
  return (
    <WrapApp className="App-header">
      <Sidebar bgColor="black" isCollapsed={false}>
        <Logo
          image="https://media2.giphy.com/media/eNAsjO55tPbgaor7ma/source.gif"
          imageName="react logo"
        />
        <LogoText>LMS</LogoText>
        <br></br>
        <Item bgColor="black">
          <Icon>
            <i className="fas fa-home" />
          </Icon>
          <a href="/">Students</a>
        </Item>
        <Item bgColor="black">
          <Icon>
            <i className="fas fa-info" />
          </Icon>
          <a href="/submission">Submission</a>
        </Item>
        <Item bgColor="black">
          <Icon>
            <i className="fas fa-sitemap" />
          </Icon>
          <a href="/attendance">Attendance</a>
        </Item>
        <Item bgColor="black">
          <Icon>
            <i className="far fa-address-book" />
          </Icon>
          <a href="/admincontroller">Admin Controller</a>
        </Item>
      </Sidebar>
      <div></div>
      <Card className="container mr-5 pr-5 pl-5 mt-5 pt-2 bg-light">
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
    </WrapApp>
  );
};
const mapStateToProps = (state) => ({
  result: state.result,
});

export default connect(mapStateToProps)(App);
