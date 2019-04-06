import React, { Component } from 'react';
import { connect } from 'react-redux'
import cuid from 'cuid';
import {
  Segment,
  Form,
  Button
} from 'semantic-ui-react';

/* Redux Actions */
import { createEvent, updateEvent } from '../../event/eventActions';

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { id } = this.state.event;
    const { history: { push, goBack }, createEvent, updateEvent } = this.props;

    if (id) {
      updateEvent(this.state.event);
      goBack();
    }
    else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      createEvent(newEvent);
      push('/events');
    }
  }

  onInputChange = (e) => {
    const newEvent = this.state.event;
    const { name, value } = e.target;
    newEvent[name] = value

    this.setState({
      event: newEvent
    })
  }

  render() {
    const { title, date, city, venue, hostedBy } = this.state.event;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              onChange={this.onInputChange}
              name="title"
              value={title}
              placeholder="Event Title"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              onChange={this.onInputChange}
              name="date"
              value={date}
              type="date"
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              onChange={this.onInputChange}
              name="city"
              value={city}
              placeholder="City event is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              onChange={this.onInputChange}
              name="venue"
              value={venue}
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              onChange={this.onInputChange}
              name="hostedBy"
              value={hostedBy}
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button positive type="submit">Submit</Button>
          <Button onClick={() => this.props.history.goBack()} type="button">Cancel</Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    event
  }
}

const actions = {
  createEvent, updateEvent
};

export default connect(
  mapStateToProps,
  actions
)(EventForm);
