import React, { Component } from "react";
import { render } from "react-dom";
var lat;
var lng;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownPosition:{}
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.setState({ownPosition: pos}) 
      });
    }
  }
  
  render() {
    return (<p>I am getting location maaan</p>);
  }

}
export default App;
