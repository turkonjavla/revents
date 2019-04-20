import React from 'react';
import { Segment, List, Label, Item } from 'semantic-ui-react';

const EventDetailsSidebar = ({ attendees }) => {
  const isHost = false;
  const attendeeList = attendees && attendees.map(attendee =>
    <Item key={attendee.id} style={{ position: 'relative' }}>
      {
        isHost &&
        <Label
          style={{ position: 'absolute' }}
          color="orange"
          ribbon="right"
        >
          Host
      </Label>
      }
      <Item.Image size="tiny" src={attendee.photoURL} />
      <Item.Content verticalAlign="middle">
        <Item.Header as="h3">
          <a href="!#">{attendee.displayName}</a>
        </Item.Header>
      </Item.Content>
    </Item>
  )
  return (
    <div>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="blue"
      >
        {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Person' : 'People'} Going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendeeList}
        </List>
      </Segment>
    </div>
  )
}

export default EventDetailsSidebar
