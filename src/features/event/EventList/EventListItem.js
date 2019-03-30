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
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src="https://randomuser.me/api/portraits/women/42.jpg" />
              <Item.Content>
                <Item.Header as="a">Event Title</Item.Header>
                <Item.Description>
                  Hosted by <a>hosted by</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> date |
            <Icon name="marker" /> time
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            <EventListAttendees />
            <EventListAttendees />
            <EventListAttendees />
          </List>
        </Segment>
        <Segment>
          <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores saepe cumque eveniet cupiditate enim esse doloribus ipsam suscipit iusto minima?</span>
        </Segment>
        <Segment clearing>
          <Button as="a" color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    )
  }
}

export default EventListItem;
