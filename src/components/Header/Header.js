import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Route, NavLink, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Map from '../Map/Map';
import image from '../../images/logo.png';

import styles from './Header.module.css';


class Header extends Component {
	render() {
		return (
			<React.Fragment>
				<Container fluid>
					<Navbar className={styles.header}>
	       			    <Navbar.Brand className={styles.logo}>
	       			    	<img src={image} alt="COVID-19" />
	       			    </Navbar.Brand>
			            <Nav className={styles.header_menu}>
		                    <NavLink to="/" exact className={styles.menu_link} activeStyle={{
		                        color: '#3333FF'
		                    }}>View on Chart</NavLink>
		                    <NavLink to={{pathname: '/Map'}} className={styles.menu_link} activeStyle={{
		                        color: '#3333FF'
		                    }}>View on Map</NavLink>
			            </Nav>
			        </Navbar>
		        </Container>
		        <Switch>
		            <Route path="/Map" component={Map} />
		            <Route path="/" component={Home} />
		        </Switch> 
            </React.Fragment>
		);
	}
}

export default Header;