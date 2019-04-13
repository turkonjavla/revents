import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

/* Redux */
import { connect } from 'react-redux';
import { incrementAsync, decrementAsync } from './testActions';

/* Google Maps Integration */
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

/* Modals */
import { openModal } from '../modals/modalActions';

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: '',
    scriptLoaded: false
  };

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = (address) => {
    this.setState({
      address
    });
  }

  handleScriptLoaded = () => {
    this.setState({
      scriptLoaded: true
    })
  }

  render() {
    const { incrementAsync, decrementAsync, data, openModal, loading } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button loading={loading} onClick={incrementAsync} color="green" content="Increment" />
        <Button loading={loading} onClick={decrementAsync} color="red" content="Decrement" />
        <Button onClick={() => openModal('TestModal', {data: 44})} color="yellow" content="Open Modal" />
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          {
            this.state.scriptLoaded &&
            <PlacesAutocomplete inputProps={inputProps} />
          }
          <button type="submit">Submit</button>
        </form>
{/*         <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={59.955413}
              lng={30.337844}
            />
          </GoogleMapReact>
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data,
  loading: state.test.loading
})

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
}

export default connect(
  mapStateToProps,
  actions
)(TestComponent);