import React, { Component } from 'react'
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import api from '../api'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    margin-top: 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateCar extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/cars/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteCar extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the car ${this.props.id} permanently?`,
            )
        ) {
            api.deleteCarById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}


class CarsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cars: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllCars().then(cars => {
            this.setState({
                cars: cars.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { cars, isLoading } = this.state

        const columns = [
            {
                Header: 'Driver Name',
                accessor: 'driverName',
                filterable: true,
            },
            {
                Header: 'Driver ID',
                accessor: 'driverId',
                filterable: true,
            },
            {
                Header: 'Driver Phone Number',
                accessor: 'driverPhoneNumber',
                filterable: true,
            },
            {
                Header: 'Vehicle Model',
                accessor: 'vehicleModel',
                filterable: true,
            },
            {
                Header: 'Plate Number',
                accessor: 'plateNumber',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteCar id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateCar id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!cars.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={cars}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={25}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default CarsList