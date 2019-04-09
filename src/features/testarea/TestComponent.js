import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

/* Redux */
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './testActions';

/* Google Maps Integration */
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class TestComponent extends Component {
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
    const { incrementCounter, decrementCounter, data } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div>
        <Script 
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyCxAR4zNhQ4kO1BIEe5v0Bl7zdzKh4L92Q&libraries=places'
          onLoad={this.handleScriptLoaded}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
        {
          this.state.scriptLoaded &&
          <PlacesAutocomplete inputProps={inputProps} />
        }
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter
}

export default connect(
  mapStateToProps,
  actions
)(TestComponent);