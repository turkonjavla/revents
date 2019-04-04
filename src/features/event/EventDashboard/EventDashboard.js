import React, { Component } from 'react';
import cuid from 'cuid';
import { Grid, Button } from 'semantic-ui-react'

/* Components */
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

/* Redux */
import { connect } from 'react-redux';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';

class EventDashboard extends Component {
  state = {
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

    this.props.createEvent(newEvent);
    this.setState({
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
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null
    })
  }

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
  }

  render() {
    const { isOpen, selectedEvent } = this.state;
    const { events } = this.props;
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
          <Button 
            onClick={this.handleFormOpen} 
            positive 
            content="Create Event" 
          />
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

const mapStateToProps = state => ({
  events: state.events
});

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

export default connect(
  mapStateToProps,
  actions
)(EventDashboard);