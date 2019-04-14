import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthLessThan, hasLengthGreaterThan } from 'revalidate';

/* Actions */
import { reigsterUser } from '../authActions';

/* Components */
import TextInput from '../../../app/common/form/TextInput';

const validate = combineValidators({
  displayName: composeValidators(
    isRequired('Display name'),
    hasLengthLessThan(18)({message: 'Display name has to be less than 18 characters'}),
    hasLengthGreaterThan(2)({message: 'Display name has to be at least 3 characters'})
  )(),
  email: isRequired('Email'),
  password: composeValidators(
    isRequired('Password'),
    hasLengthLessThan(18)({message: 'Passord has to be less than 18 characters'}),
    hasLengthGreaterThan(5)({message: 'Password has to be greater than 5 characters'})
  )()
});

const RegisterForm = ({ handleSubmit, reigsterUser, error, invalid, submitting }) => {
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
          <Button disabled={invalid || submitting} fluid size="large" color="teal">
            Register
          </Button>
        </Segment>
        {
          error &&
          <Label basic color="red">{error}</Label>
        }
      </Form>
    </div>
  );
};

const actions = {
  reigsterUser
}

export default connect(null, actions)(reduxForm({ form: 'registerForm', validate })(RegisterForm));