import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './testActions';

class TestComponent extends Component {
  render() {
    const { incrementCounter, decrementCounter, data } = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
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