import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { objectToArray } from '../../../app/common/util/helpers';
import {
  Segment,
  Item,
  Icon,
  List,
  Button,
  Label
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
      hostPhotoURL,
      hostUid
    } = this.props.event;
    const attendeeList =
      attendees &&
      objectToArray(attendees).map(attendee =>
        <EventListAttendees
          key={attendee.id}
          attendee={attendee}
        />
      )
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/event/${id}`}>{title}</Item.Header>
                <Item.Description>
                  Hosted by <Link to={`/profile/${hostUid}`}>{hostedBy}</Link>
                </Item.Description>
                {
                  this.props.event.cancelled &&
                  <Label style={{ top: '-40px' }} ribbon="right" color="red" content="This event has been cancelled" />
                }
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
        </Segment>
      </Segment.Group>
    )
  }
}

export default EventListItem;
