import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import { objectToArray } from '../../../app/common/util/helpers';
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions'

/* Components */
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsChat from './EventDetailsChat';
import EventDetailsSidebar from './EventDetailsSidebar';
import LoadingComponent from '../../../app/layout/LoadingComponent';

class EventDetailsPage extends Component {

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { event, auth, goingToEvent, cancelGoingToEvent, requesting } = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid)
    const loading = Object.values(requesting).some(a => a === true);

/*     if (loading) return <LoadingComponent inverted={true} /> */
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailsHeader
            event={event}
            isHost={isHost}
            isGoing={isGoing}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
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
    event,
    auth: state.firebase.auth,
    requesting: state.firestore.status.requesting
  }
}

const actions = {
  goingToEvent,
  cancelGoingToEvent
}

export default withFirestore(connect(
  mapStateToProps,
  actions
)(EventDetailsPage));
