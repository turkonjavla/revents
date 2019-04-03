import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

/* Components */
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar/NavBar';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import EventDetailsPage from '../../features/event/EventDetails/EventDetailsPage';
import EventForm from '../../features/event/EventForm/EventForm';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailsPage from '../../features/user/UserDetails/UserDetailsPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';

/* Testing Component */
import TestComponent from '../../features/testarea/TestComponent';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path='/events' component={EventDashboard} />
                  <Route path='/event/:id' component={EventDetailsPage} />
                  <Route path='/createEvent' component={EventForm} />
                  <Route path='/people' component={PeopleDashboard} />
                  <Route path='/profile/:id' component={UserDetailsPage} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route path='/test' component={TestComponent} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
