import React, { Component } from 'react'
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import api from '../api'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding-left:20px;
    margin-top: 10px;
    width:300px;
    color: ${props => props.theme.fg};
    background: ${props => props.theme.bg};
    float: left;
    
`
const theme = {
    fg: "palevioletred",
    bg: "yellow"
  };
class LiveMap extends Component {
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
                Header: 'Vehicles',
                accessor: 'plateNumber',
                filterable: true,
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
                        defaultPageSize={cars.length}
                        showPageSizeOptions={false}
                        minRows={0}
                        showPagination={false}
                        getTdProps={(state, rowInfo, column) => ({
                            style: {
                                height: '60px',
                                backgroundColor: '#8dd3eb',

                            },
                        })}
                    />
                )}
            </Wrapper>
        )
    }
}

export default LiveMap