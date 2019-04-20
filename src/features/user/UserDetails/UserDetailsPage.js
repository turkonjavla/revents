import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { Grid } from "semantic-ui-react";

/* User Queries */
import { userDetailsQuery } from '../userQueries';

/* Components */
import UserDetailsPhotos from './UserDetailsPhotos';
import UserDetailsEvents from './UserDetailsEvents';
import UserDetailsSidebar from './UserDetailsSidebar';
import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsDescription from './UserDetailsDescription';
import LoadingComponent from '../../../app/layout/LoadingComponent';

class UserDetailedPage extends Component {
  render() {
    const { profile, photos, auth, match, requesting } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);

    if (loading) return <LoadingComponent inverted={true} />

    return (
      <Grid>
        <UserDetailsHeader profile={profile} />
        <UserDetailsDescription profile={profile} />
        <UserDetailsSidebar isCurrentUser={isCurrentUser} />
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

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  }
  else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((auth, userUid) => userDetailsQuery(auth, userUid))
)(UserDetailedPage);