import React, { Component } from 'react';
import {
  Segment,
  Item,
  Icon,
  List,
  Button
} from 'semantic-ui-react';
import EventListAttendees from './EventListAttendees';

class EventListItem extends Component {
  render() {
    const { title, date, description, venue, hostedBy, attendees, hostPhotoURL } = this.props.event;
    const attendeeList = attendees.map(attendee => <EventListAttendees key={attendee.id} attendee={attendee} />)
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={ hostPhotoURL } />
              <Item.Content>
                <Item.Header as="a">{ title }</Item.Header>
                <Item.Description>
                  Hosted by <a>{ hostedBy }</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> { date } |
            <Icon name="marker" /> { venue }
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            { attendeeList }
          </List>
        </Segment>
        <Segment>
          <span>{ description }</span>
        </Segment>
        <Segment clearing>
          <Button as="a" color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    )
  }
}

export default EventListItem;
