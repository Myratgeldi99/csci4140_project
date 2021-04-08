import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


import { CarsList, CarsInsert, CarsUpdate, Map, LiveMap, Locations} from '../pages';
import Service from "../services/services";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
//import Profile from "../components/Profile";
import {PrivateRoute} from "../components/PrivateRoute";
import "./index.css";

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          currentUser: undefined,
        };
      }
    
      componentDidMount() {
        const user = Service.getCurrentUser();
        if (user) {
          this.setState({
            currentUser: user
          });
        }
      }
    
      logOut() {
        Service.logout();
      }

    render() {
        const { currentUser } = this.state;
        return (
        <Router>
            <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Cartrack
          </Link>

            {currentUser && currentUser.role === 'admin' && (
                <div className="navbar-nav mr-auto">
                <li className="nav-item">
                <Link to={"/live/map"} className="nav-link">
                Live Map
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/cars/list" className="nav-link">
                Fleet Info
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/cars/create" className="nav-link">
                    Add Vehicle
                </Link>
                </li>
                </div>
            )}

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>

            </div>
          )}
        </nav>
            <div className="container mt-3">
            <Switch>
            <Route exact path={["/"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/*<PrivateRoute exact path="/profile" component={Profile} />*/}
                {/* <Route path="/live/map" exact component={LiveMap} /> */}
                <Route path="/live/map" exact component={Map} />
                <Route path="/cars/list" exact component={CarsList} />
                <Route path="/cars/create" exact component={CarsInsert} />
                <Route
                    path="/cars/update/:id"
                    exact
                    component={CarsUpdate}
                />
            </Switch>
            </div>
            </div>
        </Router>
        );
    }
}

export default App