import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class EventListAttendees extends Component {
  render() {
    const { photoURL } = this.props.attendee;
    return (
      <List.Item>
        <Image as={Link} to={`/profile/${this.props.attendee.id}`} size="mini" circular src={ photoURL } />
      </List.Item>
    )
  }
}

export default EventListAttendees;