import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Grid, Card, CardHeader, CardContent, CardActions, Chip, Button, Typography } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';

import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns';
class CarItem extends Component{
    render(){
        const {cars} = this.props;
        
        return(
            <CardDeck style={{float: 'left', marginBottom:'3rem', marginLeft:'3.5rem', marginTop: '1rem', backgroundColor: 'red'}}>
                <Card style={{width: '20rem', backgroundColor: '#dbd3ca'}} >
                    <Link to={`/cars/${cars._id}`}>
                        <img style={{width: '100%', height: '300px'}} src={cars.img}
                        alt="Sport" />
                    </Link>
                    <CardHeader  title={cars.carName} />
                    <CardContent>
                        <Typography  variant="body2" color="textSecondary" component="p">
                            {cars.description}
                        </Typography>
                        <Chip icon={<SportsBasketballIcon />} label={cars.carType}/>
                        <Chip icon={<GroupIcon />} label={cars.quota}/>
                        
                    </CardContent>
                    <CardActions>
                        <Button size="large" style={{backgroundColor: "#4be369"}} variant="contained" fullWidth  component={Link} to={`/car/${cars._id}`}>
                            More Info
                        </Button>
                    </CardActions>
                </Card>
            </CardDeck>
        );
    }
}

export default CarItem;