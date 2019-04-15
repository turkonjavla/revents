import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthLessThan, hasLengthGreaterThan } from 'revalidate';

/* Components */
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';

/* Actions */
import { reigsterUser, socialLogin } from '../authActions';

const validate = combineValidators({
  displayName: composeValidators(
    isRequired('Display name'),
    hasLengthLessThan(18)({ message: 'Display name has to be less than 18 characters' }),
    hasLengthGreaterThan(2)({ message: 'Display name has to be at least 3 characters' })
  )(),
  email: isRequired('Email'),
  password: composeValidators(
    isRequired('Password'),
    hasLengthLessThan(18)({ message: 'Passord has to be less than 18 characters' }),
    hasLengthGreaterThan(5)({ message: 'Password has to be greater than 5 characters' })
  )()
});

const RegisterForm = ({ handleSubmit, reigsterUser, socialLogin, error, invalid, submitting }) => {
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
        <Divider horizontal> Or </Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Form>
    </div>
  );
};

const actions = {
  reigsterUser,
  socialLogin
}

export default connect(null, actions)(reduxForm({ form: 'registerForm', validate })(RegisterForm));