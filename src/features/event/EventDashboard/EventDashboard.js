import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

/* Components */
import EventList from '../EventList/EventList';

/* Redux */
import { connect } from 'react-redux';
import { deleteEvent } from '../eventActions';

/* Firestore */
import { firestoreConnect } from 'react-redux-firebase'

/* Loader */
import LoadingComponent from '../../../app/layout/LoadingComponent';

class EventDashboard extends Component {

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  }

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
});

const actions = {
  deleteEvent
}

export default connect(
  mapStateToProps,
  actions
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));