import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import {
  Segment,
  Item,
  Icon,
  List,
  Button
} from 'semantic-ui-react';

/* Components */
import EventListAttendees from './EventListAttendees';

class EventListItem extends Component {
  render() {
    const {
      id,
      title,
      date,
      description,
      venue,
      hostedBy,
      attendees,
      hostPhotoURL
    } = this.props.event;
    const { deleteEvent } = this.props;
    const attendeeList = attendees && attendees.map(attendee => <EventListAttendees key={attendee.id} attendee={attendee} />)
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{title}</Item.Header>
                <Item.Description>
                  Hosted by <a href="!#">{hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(date, 'dddd Do MMMM')} at {format(date, 'h:mm A')} |
            <Icon name="marker" /> {venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {attendeeList}
          </List>
        </Segment>
        <Segment>
          <span>{description}</span>
        </Segment>
        <Segment clearing>
          <Button
            as={Link}
            to={`/event/${id}`}
            color="blue"
            floated="right"
            content="View"
          />
          <Button
            as="a"
            inverted
            color="red"
            floated="right"
            content="Delete"
            onClick={deleteEvent(id)}
          />
        </Segment>
      </Segment.Group>
    )
  }
}

export default EventListItem;
