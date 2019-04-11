import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';

/* Auth */
import { login } from '../authActions';

const LoginForm = ({ login, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit(login)} error size="large">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

const actions = {
  login
}

export default connect(null, actions)(reduxForm({ form: 'loginForm' })(LoginForm));