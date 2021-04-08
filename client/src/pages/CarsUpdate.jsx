import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'
import { FormControl, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";

const sportList = [
    "Badminton",
    "Tennis",
    "Volleyball",
    "Basketball",
    "Baseball",
    "Running",
    "Table tennis",
    "Football",
    "Soccer"
  ];


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

class CarsUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            carName: "",
            carType: "",
            date: "",
            quota: "",
            description: "",
            img: "",
            location: ""
        }
    }



    handleChange = async car => {
        const change = car.target.value
        this.setState({ change })
    }

    handleUpdateCar = async () => {
        const { id, carName, carType, date, quota, description, img, location} = this.state
        const payload = { carName, carType, date, quota, description, img, location}

        await api.updateCarById(id, payload).then(res => {
            window.alert(`Car updated successfully`)
            this.setState({
                carName: "",
                carType: "",
                date: "",
                quota: "",
                description: "",    
                img: "",
                location: ""
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const car = await api.getCarById(id)

        this.setState({
            carName: car.data.data.carName,
            carType: car.data.data.carType,
            date: car.data.data.date,
            quota: car.data.data.quota,
            description: car.data.data.description,
            img: car.data.data.img,
            location: car.data.data.location,
        })
    }

    render() {
        const{ carName, carType, date, quota, description, img, location} = this.state
        return (
            <Grid container justify="center" className="marginX-1">
            <Grid item xs={12} sm={8} md={6}>
              <Card className="card">
                <CardContent>
                  <Typography variant="h3" component="h1" align="center" gutterBottom>
                    Host Your Car
                  </Typography>
                  <form onSubmit={this.handleIncludeCar}>
                    <FormControl fullWidth={true} margin="normal">
                      <TextField
                        label="Car Name *"
                        placeholder=""
                        name="evenName"
                        type="text"
                        value={carName}
                        onChange={this.handleChange}
                      />
                    </FormControl>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <FormControl
                          fullWidth={true}
                          variant="outlined"
                          margin="normal"
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            Type of Sport
                          </InputLabel>
                          <Select
                            label="Type of Sport *"
                            name="type"
                            type="name"
                            value={carType}
                            onChange={this.handleChange}
                            sportList={sportList}
                          >
                            <MenuItem value={carType}>
                              <em>Choose Sport Type</em>
                            </MenuItem>
                            {sportList.map((sport) => {
                              return (
                                <MenuItem key={sport} value={sport}>
                                  {sport}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth={true} margin="normal">
                          <TextField
                            label="Number of Player *"
                            placeholder="2-100 Players"
                            name="quota"
                            type="number"
                            value={quota}
                            onChange={this.handleChange}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl fullWidth={true} margin="normal">
                      <TextField
                        label="Image URL"
                        placeholder="EX: https://unsplash.com/photos/-JzHSIzNYnU"
                        name="image"
                        type="name"
                        value={img}
                        onChange={this.handleChange}
                      />
                    </FormControl>
                    <FormControl fullWidth={true} margin="normal">
                      <TextField
                        label="Location"
                        placeholder="EX: West 96th Street, New York, NY 10025"
                        name="place"
                        type="name"
                        value={location}
                        onChange={this.handleChange}
                      />
                    </FormControl>
                    <FormControl margin="normal">
                      <TextField
                        type="date"
                        name="date"
                        value={date}
                        onChange={this.handleChange}
                      />
                    </FormControl>
                    <FormControl fullWidth={true} margin="normal">
                      <TextField
                        label="Description"
                        placeholder="Details about this car"
                        name="description"
                        type="name"
                        value={description}
                        onChange={this.handleChange}
                      />
                    </FormControl>
                    <Button
                      className="primary-color marginB-2"
                      type="submit"
                      variant="contained"
                      fullWidth
                      onClick = {this.handleIncludeCar}
                    >
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )
    }
}

export default CarsUpdate