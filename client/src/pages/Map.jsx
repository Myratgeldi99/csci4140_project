import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import axios from 'axios';
import Pusher from 'pusher-js';
import Plates from './LiveMap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components'

const Wrapper = styled.div`
    padding-right:20px;
    margin-top: 10px;
    width:1200px;
    height:670px;
    float: right;
`
const mapStyles = {
    maxWidth: "750px",
    height: "750px",
    overflowX: "hidden",
    overflowY: "hidden"
}
const containerStyle = {
    maxWidth: "750px",
    height: "850px"
   };

const markerStyle = {
  height: '50px',
  width: '50px',
  marginTop: "-50px"
}

const imgStyle = {
  height: '40%'
}

const Marker = ({ title }) => (
  <div style={markerStyle}>
    <img style={imgStyle} alt={title} src="https://www.pngitem.com/pimgs/m/16-169623_truck-silhouette-png-cargo-truck-silhouette-png-transparent.png" />
    <h3>{title}</h3>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      center: { lat: 5.6219868, lng: -0.23223 },
      locations: {},
      users_online: {},
      current_user: ''
    }
  }

  componentDidMount() {
    let pusher = new Pusher('6c6f63129b24a5c022c7', {
      authEndpoint: "http://localhost:8888/pusher/auth",
      cluster: "ap1"
    });

    this.presenceChannel = pusher.subscribe('presence-channel');
    this.presenceChannel.bind('pusher:subscription_succeeded', members => {
      this.setState({
        users_online: members.members,
        current_user: members.myID
      });
      this.getLocation();
      this.notify();
    });

    this.presenceChannel.bind('location-update', body => {
      this.setState((prevState, props) => {
        const newState = { ...prevState };
        newState.locations[`${body.username}`] = body.location;
        return newState;
      });
    });

    this.presenceChannel.bind('pusher:member_removed', member => {
      this.setState((prevState, props) => {
        const newState = { ...prevState };
        // remove member location once they go offline
        delete newState.locations[`${member.id}`];
        // delete member from the list of online users
        delete newState.users_online[`${member.id}`];

        return newState;
      })
      this.notify();
    })

    this.presenceChannel.bind('pusher:member_added', member => {
      this.notify();
    })
  }

  getLocation = () => {
    if ("geolocation" in navigator) {
      // get the longitude & latitude then update the map center as the new user location
      navigator.geolocation.watchPosition(position => {
        let location = { lat: position.coords.latitude, lng: position.coords.longitude };

        this.setState((prevState, props) => {
          let newState = { ...prevState };

          newState.center = location;
          newState.locations[`${prevState.current_user}`] = location;

          return newState;
        });

        axios.post("http://localhost:8888/update-location", {
          username: this.state.current_user,
          location: location
        }).then(res => {
          if (res.status === 200) {
            console.log("new location updated successfully");
          }
        });
      })
    } else {
      alert("Sorry, geolocation is not available on your device. You need that to use this app");
    }
  }

  notify = () => toast(`Users online : ${Object.keys(this.state.users_online).length}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: 'info'
  });

  render() {
    var locationMarkers = Object.keys(this.state.locations).map((username, id) => {
      return (
        <Marker
          key={id}
          title={`${username === this.state.current_user ? 'My location' : username + "'s location"}`}
          lat={this.state.locations[`${username}`].lat}
          lng={this.state.locations[`${username}`].lng}
        >
        </Marker>
      );
    });

    return (
        <div>
            <Plates/>
            <Wrapper>   
                <GoogleMap
                bootstrapURLKeys={{ key: 'AIzaSyCz-8UmQUgMyCHOa4FrPapGw_6fNJlhWPU' }}
                center={this.state.center}
                zoom={17}
                >
                {locationMarkers}
                </GoogleMap>
                <ToastContainer />
            </Wrapper>

        </div>

    )
  } 
}

export default App;

// import React, { Component } from "react";
// import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
// import { useEffect, useState } from "react";
// import Locations from './Locations';

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "React"
//     };
//   }
//   render() {
//     return (
//       <div>
//         <Map
//           google={this.props.google}
//           zoom={5}
//           style={mapStyles}
//           initialCenter={{
//             lat: 39.354690,
//             lng: 58.464827
//           }}
//         >
//          <Marker
//           onClick={this.onMarkerClick}
//           name={'This is test name'}
//         />
//         </Map>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyCz-8UmQUgMyCHOa4FrPapGw_6fNJlhWPU'
// })(App);

// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// import React, { Component }  from 'react';
// import { useEffect, useState } from "react";
// export const MapContainer = () => { 
//     const [ currentPosition, setCurrentPosition ] = useState({});
  
//     const success = position => {
//       const currentPosition = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       }
//       setCurrentPosition(currentPosition);
//     };
    
//     useEffect(() => {
//       navigator.geolocation.getCurrentPosition(success);
//     })
  
//     const onMarkerDragEnd = (e) => {
//         const lat = e.latLng.lat();
//         const lng = e.latLng.lng();
//         setCurrentPosition({ lat, lng})
//       };
//     // const onSelect = item => {
//     //   setSelected(item);
//     // }
//     const mapStyles = {        
//         height: "100vh",
//         width: "100%"};
      
//       const defaultCenter = {
//         lat: 41.3851, lng: 2.1734
//       }
//     return (
//         <LoadScript
//         googleMapsApiKey='AIzaSyCz-8UmQUgMyCHOa4FrPapGw_6fNJlhWPU'>
//         <GoogleMap
//           mapContainerStyle={mapStyles}
//           zoom={17}
//           center={currentPosition}>
//           {
//             currentPosition.lat ? 
//             <Marker
//             position={currentPosition}
//             onDragEnd={(e) => onMarkerDragEnd(e)}
//             draggable={true} /> :
//             null
//           }
//         </GoogleMap>
//       </LoadScript>
//     )
// }
// export default MapContainer;