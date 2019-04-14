import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { events, deleteEvent } = this.props;
    const eventList = events && events.map(event => 
      <EventListItem 
        key={event.id} 
        deleteEvent={deleteEvent} 
        event={event} 
      />
    );
    return (
      <div>
        { eventList }
      </div>
    )
  }
}

export default EventList;