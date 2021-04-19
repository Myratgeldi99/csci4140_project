import React, { Component } from 'react';
import Service from "../services/services";
import GoogleMap from 'google-map-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'
const PubNub = require('pubnub');

const Wrapper = styled.div`
    // padding-right:10px;
    margin-top: 10px;
    width:900px;
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

var subkey = "sub-c-37c310f8-a0e6-11eb-9adf-f2e9c1644994";
var myUUID = localStorage.getItem(subkey + "uuid");
if (myUUID === null) {
    myUUID = PubNub.generateUUID();
}

class AdminMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pubnub: new PubNub({
                subscribeKey: subkey,
                publishKey: "pub-c-a4a925b2-9f66-42c2-b309-87fc247d5f6a",
                ssl: true,
                uuid: myUUID,
                heartbeatInterval: 30
            }),
            currentUser: Service.getCurrentUser(),
            locations: {},
            center: { lat: 5.6219868, lng: -0.23223 }
        }
        this.getLocation = this.getLocation.bind(this);
        this.sendPosition = this.sendPosition.bind(this);
        this.state.pubnub.subscribe({
            channels: ["drivers"],
            withPresence: true
        });
    }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.sendPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    sendPosition(position) {
        this.setState((prevState, props) => {
            let newState = { ...prevState };
            let myCoords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            newState.center = myCoords;
            return newState;
        });
    }
    componentDidMount() {
        var self = this;
        setInterval(() => {
            self.getLocation();
        }, 5000);
        this.state.pubnub.addListener({
            message: function (msg) {
                self.setState((prevState, props) => {
                    let newState = { ...prevState };
                    let myJson = {
                        driver_name: msg.message.driver_name,
                        coords: msg.message.coords
                    }
                    newState.locations[msg.message.uuid] = myJson;
                    return newState;
                });
                console.log(msg.message.uuid);
                console.log(msg.message.driver_name);
                console.log(msg.message.coords.lat);
                console.log(msg.message.coords.lng);
            },
            presence: function(event) {
                var action = event.action;
                var channel = event.channel;
                var uuid = event.uuid;
                var data = event.state;
                var occupancy = event.occupancy;
        
                console.log("");
                console.log("*** presence event ***");
                console.log("action:    " + action);
                console.log("channel:   " + channel);
                console.log("uuid:      " + uuid);
                console.log("occupancy: " + occupancy);
                console.log("data:      " + JSON.stringify(data));
                console.log("*** presence event ***");
                console.log("");
        
                if (action === "join") {
                    console.log("someone joined");
                    
                } 
                else if ((action === "timeout") || (action === "leave")) {
                    console.log("someone left or timeout");
                    self.setState((prevState, props) => {
                        let newState = { ...prevState };
                        delete newState.locations[uuid];
                        return newState;
                    });
                }
                else if (action === "state-change") {
                    console.log("!!!@@@ state-change event @@@!!!");
                }
            }
        })
    }
    componentWillUnmount(){
        this.state.pubnub.unsubscribe({
            channels: ["drivers"]
        })
    }

    render() {
        var locationMarkers = Object.keys(this.state.locations).map((uuid, id) => {
            return (
                <Marker
                    key={id}
                    title={`${this.state.locations[`${uuid}`].driver_name + "'s location"}`}
                    lat={this.state.locations[`${uuid}`].coords.lat}
                    lng={this.state.locations[`${uuid}`].coords.lng}
                >
                </Marker>
            );
        });
        return (
            <div>
                <Wrapper>
                    <GoogleMap
                        bootstrapURLKeys={{ key: 'AIzaSyBe9Zm9j2vi6eOTX39DH8WkcMN67xSMQHA' }}
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

export default AdminMap;