import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

/* Components */
import EventList from '../EventList/EventList';
import EventActivity from '../EventActivity/EventActivity';

/* Redux */
import { connect } from 'react-redux';

/* Event Actions */
import { getEventsForDashboard } from '../eventActions';

/* Firestore */
import { firestoreConnect } from 'react-redux-firebase';

/* Loader */
import LoadingComponent from '../../../app/layout/LoadingComponent';

class EventDashboard extends Component {

  componentDidMount() {
    this.props.getEventsForDashboard();
  }

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  getEventsForDashboard
}

export default connect(
  mapStateToProps,
  actions
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));