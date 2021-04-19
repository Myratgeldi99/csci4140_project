import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Service from "./services/services";
import Login from "./components/Login";
import Register from "./components/Register";
import {PrivateRoute} from "./components/PrivateRoute";
import {AdminRoute} from "./components/AdminRoute";
import Home from "./components/Home";
import AdminMap from './components/AdminMap';
import DriverMap from "./components/DriverMap";


class App extends Component {
  constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
  
      this.state = {
        currentUser: Service.getCurrentUser(),
      };
    }
  
    componentDidMount() {
      
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
          Fleet Tracker
        </Link>

          {currentUser && currentUser.role === 'admin' && (
              <div className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link to={"/live/amap"} className="nav-link">
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

{currentUser && currentUser.role === 'driver' && (
              <div className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link to={"/live/map"} className="nav-link">
              Live Map
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
            {/*<li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
        </li>*/}

          </div>
        )}
      </nav>
          <div className="container mt-3">
          <Switch>
          <Route exact path={["/"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <AdminRoute exact path="/register" component={Register} />
          <AdminRoute exact path="/live/amap" component={AdminMap} />
          <PrivateRoute exact  path="/live/map" component={DriverMap}/>
          </Switch>
          </div>
          </div>
      </Router>
      );
  }
}

export default App;
