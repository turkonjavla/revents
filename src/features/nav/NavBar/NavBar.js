import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
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

  handleSignIn = () => {
    this.props.openModal('LoginModal');
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  }

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
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
                <SignedInMenu auth={auth} signOut={this.handleSignOut} />
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

const mapStateToProps = state => ({
  auth: state.firebase.auth
})

const actions = {
  openModal
}

export default withRouter(withFirebase(connect(mapStateToProps, actions)(NavBar)));