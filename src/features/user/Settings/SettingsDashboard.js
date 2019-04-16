import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/* Components */
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';

/* Auth Actions */
import { updatePassword } from '../../auth/authActions'

/* Use Actions */
import { updateProfile } from '../userActions';

const SettingsDashboard = ({ updatePassword, providerId, user, updateProfile }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route path="/settings/about" component={AboutPage} />
          <Route
            path="/settings/basic"
            render={() =>
              <BasicPage
                updateProfile={updateProfile}
                initialValues={user}
              />
            }
          />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route
            path="/settings/account"
            render={() =>
              <AccountPage
                providerId={providerId}
                updatePassword={updatePassword}
              />
            }
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});

const actions = {
  updatePassword,
  updateProfile
}

export default connect(mapStateToProps, actions)(SettingsDashboard)
