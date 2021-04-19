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

class DriverMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pubnub: new PubNub({
                subscribeKey: "sub-c-37c310f8-a0e6-11eb-9adf-f2e9c1644994",
                publishKey: "pub-c-a4a925b2-9f66-42c2-b309-87fc247d5f6a",
                uuid: myUUID,
                ssl: true,
                heartbeatInterval: 30
            }),
            currentUser: Service.getCurrentUser(),
            center: { lat: 5.6219868, lng: -0.23223 }
        }
        this.getLocation = this.getLocation.bind(this);
        this.sendPosition = this.sendPosition.bind(this);
        this.state.pubnub.subscribe({
            channels: ["drivers"]
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
        this.setState({
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        })
        var publishPayload = {
            channel: "drivers",
            message: {
                uuid: myUUID,
                driver_name: this.state.currentUser.name,
                coords: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            }
        }
        //console.log(JSON.stringify(publishPayload));
        this.state.pubnub.publish(publishPayload, function (status, response) {
            console.log(status, response);
        })
    }
    componentDidMount() {
        var self = this;
        this.state.pubnub.addListener({
            status: function (statusEvent) {
                if (statusEvent.category === "PNConnectedCategory") {
                    setInterval(() => {
                        self.getLocation();
                    }, 5000);
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
        return (
            <div>
                <Wrapper>
                    <GoogleMap
                        bootstrapURLKeys={{ key: 'AIzaSyBe9Zm9j2vi6eOTX39DH8WkcMN67xSMQHA' }}
                        center={this.state.center}
                        zoom={17}
                    >
                        <Marker
                            key={"id"}
                            title={'My location'}
                            lat={this.state.center.lat}
                            lng={this.state.center.lng}>
                        </Marker>
                    </GoogleMap>
                </Wrapper>

            </div>
        )
    }
}

export default DriverMap;