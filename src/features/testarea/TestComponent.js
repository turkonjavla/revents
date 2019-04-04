import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounte } from './testActions';

class TestComponent extends Component {
  render() {
    const { incrementCounter, decrementCounte, data } = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounte} color="red" content="Decrement" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounte
}

export default connect(mapStateToProps, actions)(TestComponent);