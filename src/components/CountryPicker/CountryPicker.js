import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
	const [fetchedCountries, setFetchedCountries] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedCountries(await fetchCountries());
		}

		fetchAPI();

	}, [setFetchedCountries]);

	return (
		<React.Fragment>
			<Col xs="12" md="4" lg="4">
				<Form className={styles.countrylist_outer}>
				  <Form.Group controlId="countrydropdown">
				    <Form.Control className={styles.countrylist} as="select" custom defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
				      <option value="">Global</option>
				      {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
				    </Form.Control>
				  </Form.Group>
				</Form>
			</Col>
		</React.Fragment>
	)
}

export default CountryPicker;