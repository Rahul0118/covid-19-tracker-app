import React, { Component } from 'react';
import Cards from '../Cards/Cards';
import Chart from '../Chart/Chart';
import CountryPicker from '../CountryPicker/CountryPicker';
import { Container, Row } from 'react-bootstrap';

import { fetchData } from '../../api';


class Home extends Component {

  state = {
    data: {},
    country: '',
  }

  async componentDidMount( ) {
    const fetchedData = await fetchData();

    this.setState({data: fetchedData});
  }

  handleCountryChange = async (country) => {

    // fetch the data

    const fetchedData = await fetchData(country);  

    // set the state

    this.setState({data: fetchedData, country: country});

  }

  render() {
    const { data, country } = this.state;

    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Cards data={data}/>
          <CountryPicker handleCountryChange={this.handleCountryChange}/>
          <Chart data={data} country={country}/>
        </Row>
      </Container>
    );
  }
}

export default Home;
