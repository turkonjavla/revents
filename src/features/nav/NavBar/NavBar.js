import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Menu,
  Container,
  Button
} from 'semantic-ui-react';

class NavBar extends Component {
  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/people" name="People" />
          <Menu.Item>
            <Button as={Link} to="/createEvent" floated="right" inverted content="Create Event" />
          </Menu.Item>
          <Menu.Item position="right">
            <Button inverted content="Login" />
            <Button inverted content="Sign Out" style={{ marginLeft: '0.5em' }} />
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}

export default NavBar;