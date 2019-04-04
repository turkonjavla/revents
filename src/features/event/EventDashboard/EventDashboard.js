import React, { Component } from 'react';
import cuid from 'cuid';
import { Grid, Button } from 'semantic-ui-react'
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

class EventDashboard extends Component {
  state = {
    events: events,
    isOpen: false,
    selectedEvent: null
  };

  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
  }

  handleCancelForm = () => {
    this.setState({
      isOpen: false
    });
  }

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';

    const updatedEvents = [...this.state.events, newEvent];
    this.setState({
      events: updatedEvents,
      isOpen: false
    });
  }

  handleOpenEvent = (eventToOpen) => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  }

  handleUpdateEvent = (updatedEvent) => {
    this.setState({
      events: this.state.events.map(event => {
        if(event.id === updatedEvent.id) {
          return Object.assign({}, updatedEvent);
        }
        else {
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    })
  }

  handleDeleteEvent = (eventId) => () => {
    const updatedEvents = this.state.events.filter(updatedEvent => updatedEvent.id !== eventId);
    this.setState({
      events: updatedEvents
    });
  }

  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList 
            onEventOpen={this.handleOpenEvent}
            deleteEvent={this.handleDeleteEvent}
            events={events} 
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button onClick={this.handleFormOpen} positive content="Create Event" />
          {
            isOpen &&
            <EventForm 
              selectedEvent={selectedEvent}
              handleCancel={this.handleCancelForm} 
              createEvent={this.handleCreateEvent}
              updateEvent={this.handleUpdateEvent}
            />
          }
        </Grid.Column>
      </Grid>
    )
  }
}

export default EventDashboard;