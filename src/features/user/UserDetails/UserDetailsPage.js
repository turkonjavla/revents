import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from "semantic-ui-react";

/* Components */
import UserDetailsPhotos from './UserDetailsPhotos';
import UserDetailsEvents from './UserDetailsEvents';
import UserDetailsSidebar from './UserDetailsSidebar';
import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsDescription from './UserDetailsDescription';

class UserDetailedPage extends Component {
  render() {
    const { profile, photos } = this.props;
    return (
      <Grid>
        <UserDetailsHeader profile={profile} />
        <UserDetailsDescription profile={profile} />
        <UserDetailsSidebar />
        {
          photos &&
          photos.length > 0 &&
          <UserDetailsPhotos photos={photos} />
        }
        <UserDetailsEvents />
      </Grid>
    );
  }
}

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }
  ]
}

const mapStateToProps = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);