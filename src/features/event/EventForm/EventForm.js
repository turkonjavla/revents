/*global google*/
import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { reduxForm, Field } from 'redux-form';

/* Revalidate */
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import {
  Segment,
  Form,
  Button,
  Grid,
  Header
} from 'semantic-ui-react';

/* Google Maps Integration */
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';

/* Redux Form Components */
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

/* Redux Actions */
import { createEvent, updateEvent, cancelToggle } from '../../event/eventActions';

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
  title: isRequired({ message: 'Event Title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date')
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleScriptLoaded = () => {
    this.setState({
      scriptLoaded: true
    })
  }

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('city', selectedCity)
      });
  }

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('venue', selectedVenue)
      });
  }

  onFormSubmit = values => {
    const { id } = this.props.initialValues;
    const { history: { push, goBack }, createEvent, updateEvent } = this.props;

    values.venueLatLng = this.state.venueLatLng;

    if (id) {
      if(Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng
      }
      updateEvent(values);
      goBack();
    }
    else {
      createEvent(values);
      push('/events');
    }
  }

  render() {
    const { invalid, submitting, pristine, event, cancelToggle } = this.props;
    return (
      <Grid>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="blue" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event"
              />
              <Header sub color="blue" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ['(cities)'] }}
                onSelect={this.handleCitySelect}
                placeholder="Event City"
              />
              {
                this.state.scriptLoaded &&
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ['establishment']
                  }}
                  onSelect={this.handleVenueSelect}
                  placeholder="Event Venue"
                />
              }
              <Field
                name="date"
                type="text"
                autoComplete="off"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Date and Time of Event"
              />
              <Button disabled={invalid || submitting || pristine} positive type="submit">Submit</Button>
              <Button onClick={() => this.props.history.push('/events')} type="button">Cancel</Button>
              <Button
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type="button"
                color={event.cancelled ? 'green' : 'red'}
                floated="right"
                content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    initialValues: event,
    event
  }
}

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

export default withFirestore(connect(
  mapStateToProps,
  actions
)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm)));
