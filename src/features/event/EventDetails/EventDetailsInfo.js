import React, { Component } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import format from 'date-fns/format';

/* Components */
import EventDetailsMap from './EventDetailsMap';

class EventDetailsInfo extends Component {
  state = {
    showMap: false
  }

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }))
  }

  render() {
    const { description, date, venue } = this.props.event;
    const { event } = this.props;
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="blue" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="blue" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{format(date, 'dddd Do MMMM')} at {format(date, 'h:mm A')}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="blue" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                onClick={this.showMapToggle}
                color="blue"
                size="tiny"
                content={this.state.showMap ? 'Hide Map' : 'Show Map'}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        {
          this.state.showMap &&
          <EventDetailsMap
            lat={event.venueLatLng.lat}
            lng={event.venueLatLng.lng}
          />
        }
      </Segment.Group>
    )
  }
}

export default EventDetailsInfo;
