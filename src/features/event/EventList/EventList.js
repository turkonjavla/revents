import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { events, onEventOpen } = this.props;
    const eventList = events.map(event => <EventListItem onEventOpen={onEventOpen} key={event.id} event={event} />);
    return (
      <div>
        <h1>Event List</h1>
        { eventList }
      </div>
    )
  }
}

export default EventList;