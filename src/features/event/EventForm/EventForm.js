import React, { Component } from 'react';
import {
  Segment,
  Form,
  Button
} from 'semantic-ui-react';

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: ''
}

class EventForm extends Component {
  state = {
    event: emptyEvent
  }

  componentDidMount() {
    const { selectedEvent, } = this.props;

    if (selectedEvent !== null) {
      this.setState({
        event: selectedEvent
      })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedEvent !== prevState.selectedEvent) {
      return ({
        event: nextProps.selectedEvent || emptyEvent
      })
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { id } = this.state.event;

    if(id) {
      this.props.updateEvent(this.state.event)
    }
    else {
      this.props.createEvent(this.state.event);
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
    const { handleCancel } = this.props;
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
          <Button onClick={handleCancel} type="button">Cancel</Button>
        </Form>
      </Segment>
    )
  }
}

export default EventForm;
