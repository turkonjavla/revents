import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';
import { Grid } from 'semantic-ui-react';
import { objectToArray } from '../../../app/common/util/helpers';

/* Components */
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsChat from './EventDetailsChat';
import EventDetailsSidebar from './EventDetailsSidebar';

class EventDetailsPage extends Component {

  async componentDidMount() {
    const { firestore, match, history: { push } } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);

    if (!event.exists) {
      push('/events');
      toastr.error('Sorry', 'Event not found');
    }
  }

  render() {
    const { event } = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailsHeader event={event} />
          <EventDetailsInfo event={event} />
          <EventDetailsChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailsSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }

  return {
    event
  }
}

export default withFirestore(connect(
  mapStateToProps
)(EventDetailsPage));
