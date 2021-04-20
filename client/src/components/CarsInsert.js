import React, { Component } from 'react'
import api from '../api'
import Service from "../services/services";

import styled from 'styled-components'
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin-left:200px;
    margin-top: 30px;
    width:600px;
    background-color: 'red';
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;

`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`


class CarsInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            driverName: "",
            driverId: "",
            vehicleModel: "",
            plateNumber: ""
        }
    }
    
    handleChange = async e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleIncludeCar = async () => {
        const { driverName, driverId, vehicleModel, plateNumber} = this.state;
        const payload = { driverName, driverId, vehicleModel, plateNumber};

        await api.insertCar(payload).then(res => {
            window.alert(`Car created successfully`)
            this.setState({
                driverName: "",
                driverId: "",
                vehicleModel: "",
                plateNumber: ""
            })
        })

        await Service.registerDriver(driverName, driverId + "@fleetracker.com", "driver1234");
    }

    render() {
        const { driverName, driverId, vehicleModel, plateNumber} = this.state
        return (
           <Wrapper>
                <Title>Add Vehicle</Title>
                
                <Label>Driver Name: </Label>
                <InputText
                    type="text"
                    name = "driverName"
                    value={driverName}
                    onChange={this.handleChange}
                />

                <Label>Driver ID: </Label>
                <InputText
                    type="text"
                    name = "driverId"
                    value={driverId}
                    onChange={this.handleChange}
                />

                
                <Label>Vehicle Model: </Label>
                <InputText
                    type="text"
                    name = "vehicleModel"
                    value={vehicleModel}
                    onChange={this.handleChange}
                />

                <Label>Vehicle Plate Number: </Label>
                <InputText
                    type="text"
                    name = "plateNumber"
                    value={plateNumber}
                    onChange={this.handleChange}
                />
                <Button onClick={this.handleIncludeCar}>Add Vehicle</Button>
                <CancelButton href={'/cars/list'}>Cancel</CancelButton>
            </Wrapper>

            
        )
    }
}

export default CarsInsert