import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

/* Components */
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';

/* Auth */
import { login, socialLogin } from '../authActions';

const LoginForm = ({ login, handleSubmit, error, socialLogin }) => {
  return (
    <Form onSubmit={handleSubmit(login)} size="large">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="Password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
      {
        error &&
        <Label basic color="red">{error}</Label>
      }
      <Divider horizontal> Or </Divider>
      <SocialLogin socialLogin={socialLogin} />
    </Form>
  );
};

const actions = {
  login,
  socialLogin
}

export default connect(null, actions)(reduxForm({ form: 'loginForm' })(LoginForm));