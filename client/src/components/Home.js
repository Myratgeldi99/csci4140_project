import React, { Component } from "react";
import Service from "../services/services";
import { Carousel } from 'react-bootstrap';
export default class Home extends Component {
  constructor(props) {
    super(props);

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

  render() {

    const { currentUser } = this.state;
    return (
      <div>
      <div class="row" style={{paddingBottom: "200px"}}>
        <div style={{width: '50%'}}>
          <h1 class="display-2 text-center" style={{fontFamily: "'Lobster', cursive",}}>Fleet Tracker</h1>
          <p style={{fontSize: "1.6rem",}} class="lead">This is a simple web application to manage your vehicles. 
          With Fleet Tracker, you will be able to: </p>
          <ul class="lead" style={{fontSize: "1.4rem",}}>
            <li>know the locations of your vehicles via live map</li>
            <li>add a new vehicle to your fleet</li>
            <li>update a vehicle information</li>
            <li>delete a vehicle</li>
          </ul>
          
          <p class="lead text-center">
            <a class="btn btn-primary btn-lg" href="/login" role="button">Get Started</a>
          </p>
        </div>

        <Carousel style={{width: '50%'}}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.roboticsbusinessreview.com/wp-content/uploads/2019/09/AdobeStock_212989119-1024x630.jpeg"
              style={{ height: '400px' }}
              alt="First slide"
            />

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.friendlygl.com/wp-content/uploads/2018/11/a.png"
              style={{ height: '400px' }}
              alt="Second slide"
            />

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://supplychainbeyond.com/wp-content/uploads/2019/09/artificial-intelligence-in-logistics.jpg"
              style={{ height: '400px' }}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>

<div class="row" style={{paddingBottom: "200px"}}>
      <div style={{width: '50%'}}>
      <img
              className="d-block w-100"
              src="../../map.png"
              style={{ height: '400px' }}
              alt="myImg"
            />
      </div>
      <div style={{width: '50%'}}>
          <h1 class="display-3 text-center" style={{fontFamily: "'Lobster', cursive",}}>Live Map</h1>
          <p style={{fontSize: "1.6rem",}} class="lead">This is a simple web application to manage your vehicles. 
          With Fleet Tracker, you will be able to: </p>
          <ul class="lead" style={{fontSize: "1.4rem",}}>
            <li>know the locations of your vehicles via live map</li>
            <li>add a new vehicle to your fleet</li>
            <li>update a vehicle information</li>
            <li>delete a vehicle</li>
          </ul>
          
          <p class="lead text-center">
            <a class="btn btn-primary btn-lg" href="/login" role="button">Get Started</a>
          </p>
        </div>
</div>
<div class="row" style={{paddingBottom: "200px"}}>
      <div style={{width: '50%'}}>
          <h1 class="display-3 text-center" style={{fontFamily: "'Lobster', cursive",}}>Add Vehicle</h1>
          <p style={{fontSize: "1.6rem",}} class="lead">This is a simple web application to manage your vehicles. 
          With Fleet Tracker, you will be able to: </p>
          <ul class="lead" style={{fontSize: "1.4rem",}}>
            <li>know the locations of your vehicles via live map</li>
            <li>add a new vehicle to your fleet</li>
            <li>update a vehicle information</li>
            <li>delete a vehicle</li>
          </ul>
          
          <p class="lead text-center">
            <a class="btn btn-primary btn-lg" href="/login" role="button">Get Started</a>
          </p>
        </div>
        <div style={{width: '50%'}}>
      <img
              className="d-block w-100"
              src="../../add.png"
              style={{ height: '400px' }}
              alt="myImg"
            />
      </div>
</div>
</div>
    );
  }
}
