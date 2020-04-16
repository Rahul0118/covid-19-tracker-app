import React from 'react';
import { Col, Card } from 'react-bootstrap';
import CountUp from 'react-countup';
import cx from 'classnames';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Cards.module.css';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
	//console.log(confirmed);
	if(!confirmed) {
		return 'Loading...';
	}

	return (
		<React.Fragment>
			<Col xs="12" md="4" lg="4">
				<Card className={[cx(styles.card, styles.infected)]}>
				  <Card.Body>
				  	<Card.Title className={[cx(styles.title, styles.infectedcolor)]}>Infected</Card.Title>
				    <Card.Text className={[cx(styles.count, styles.infectedcolor)]}><CountUp start={0} end={confirmed.value} duration={2.5} separator="," /></Card.Text>
				    <Card.Text className={[cx(styles.date, styles.infectedcolor)]}>{new Date(lastUpdate).toDateString()}</Card.Text>
				    <Card.Text className={[cx(styles.content, styles.infectedcolor)]}>Number of active cases of COVID-19</Card.Text>
				  </Card.Body>
				</Card>
			</Col>
			<Col xs="12" md="4" lg="4">
				<Card className={[cx(styles.card, styles.recovered)]}>
				  <Card.Body>
				  	<Card.Title className={[cx(styles.title, styles.recoveredcolor)]}>Recovered</Card.Title>
				    <Card.Text className={[cx(styles.count, styles.recoveredcolor)]}><CountUp start={0} end={recovered.value} duration={2.5} separator="," /></Card.Text>
				    <Card.Text className={[cx(styles.date, styles.recoveredcolor)]}>{new Date(lastUpdate).toDateString()}</Card.Text>
				    <Card.Text className={[cx(styles.content, styles.recoveredcolor)]}>Number of recoveries from COVID-19</Card.Text>
				  </Card.Body>
				</Card>
			</Col>
			<Col xs="12" md="4" lg="4">
				<Card className={[cx(styles.card, styles.deaths)]}>
				  <Card.Body>
				  	<Card.Title className={[cx(styles.title, styles.deathcolor)]}>Deaths</Card.Title>
				    <Card.Text className={[cx(styles.count, styles.deathcolor)]}><CountUp start={0} end={deaths.value} duration={2.5} separator="," /></Card.Text>
				    <Card.Text className={[cx(styles.date, styles.deathcolor)]}>{new Date(lastUpdate).toDateString()}</Card.Text>
				    <Card.Text className={[cx(styles.content, styles.deathcolor)]}>Number of deaths caused by COVID-19</Card.Text>
				  </Card.Body>
				</Card>
			</Col>
		</React.Fragment>
	)
}

export default Cards;