import React from 'react';
import { Segment, Image, Header, Item, Button } from 'semantic-ui-react';

const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const EventDetailsHeader = ({ event }) => {
  const { title, date, category, hostedBy } = event;
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image style={eventImageStyle} src={`/assets/categoryImages/${category}.jpg`} fluid />
        <Segment style={eventImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={title}
                  style={{ color: 'white' }}
                />
                <p>{date}</p>
                <p>
                  Hosted by <strong>{hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="blue">JOIN THIS EVENT</Button>

        <Button inverted color="violet" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  )
}

export default EventDetailsHeader
