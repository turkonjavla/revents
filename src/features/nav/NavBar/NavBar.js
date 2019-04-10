import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Menu,
  Container,
  Button
} from 'semantic-ui-react';

/* Components */
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

/* Modals */
import { openModal } from '../../modals/modalActions';

class NavBar extends Component {
  state = {
    authenticated: false
  }

  handleSignIn = () => {
    this.props.openModal('LoginModal');
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  }

  handleSignOut = () => {
    this.setState({
      authenticated: false
    });
    this.props.history.push('/');
  }

  render() {
    const { authenticated } = this.state
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/test" name="Test" />
          {authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}
          {
            authenticated &&
            <Menu.Item>
              <Button as={Link} to="/createEvent" floated="right" inverted content="Create Event" />
            </Menu.Item>
          }

          {
            authenticated ?
              (
                <SignedInMenu signOut={this.handleSignOut} />
              ) :
              (
                <SignedOutMenu register={this.handleRegister} signIn={this.handleSignIn} />
              )
          }
        </Container>
      </Menu>
    )
  }
}

const actions = {
  openModal
}

export default withRouter(connect(null, actions)(NavBar));