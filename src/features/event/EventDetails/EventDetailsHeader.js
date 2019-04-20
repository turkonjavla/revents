import React from 'react';
import { Link } from 'react-router-dom'
import { Segment, Image, Header, Item, Button } from 'semantic-ui-react';
import format from 'date-fns/format';

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

const EventDetailsHeader = ({ event, isHost, isGoing, goingToEvent }) => {
  const { id, title, date, category, hostedBy } = event;
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
                <p>{format(date, 'dddd Do MMMM')}</p>
                <p>
                  Hosted by <strong>{hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {
          !isHost &&
          (
            <div>
              {
                isGoing ?
                  <Button>Cancel My Place</Button> :
                  <Button onClick={() => goingToEvent(event)} color="blue">JOIN THIS EVENT</Button>
              }
            </div>
          )
        }
        {
          isHost &&
          <Button
            as={Link}
            to={`/manage/${id}`}
            inverted
            color="violet"
          >
            Manage Event
        </Button>
        }
      </Segment>
    </Segment.Group>
  )
}

export default EventDetailsHeader
