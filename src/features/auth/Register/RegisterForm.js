import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { reigsterUser } from '../authActions';

const RegisterForm = ({ handleSubmit, reigsterUser }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit(reigsterUser)} size="large">
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Button fluid size="large" color="teal">
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

const actions = {
  reigsterUser
}

export default connect(null, actions)(reduxForm({ form: 'registerForm' })(RegisterForm));