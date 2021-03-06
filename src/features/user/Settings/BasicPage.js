import React, { Component } from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import moment from 'moment';

/* Components */
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from '../../../app/common/form/RadioInput';

const validate = combineValidators({
  displayName: isRequired({ message: 'Please enter a display name' }),
  dateOfBirth: isRequired({ message: 'Please enter a valid date' })
});

class BasicPage extends Component {
  render() {
    const { invalid, pristine, submitting, handleSubmit, updateProfile } = this.props;
    return (
      <Segment>
        <Header dividing size='large' content='Basics' />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={8}
            name='displayName'
            type='text'
            component={TextInput}
            placeholder='Known As'
          />
          <Form.Group inline>
            <label>Gender: </label>
            <Field
              name="gender"
              type="radio"
              value='male'
              label="Male"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value='female'
              label="Female"
              component={RadioInput}
            />
          </Form.Group>
          <Field
            autoComplete="off"
            width={8}
            name='dateOfBirth'
            component={DateInput}
            placeholder='Date of Birth'
            dateFormat='YYYY-MM-DD'
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode="select"
            maxDate={moment().subtract(18, 'years')}
          />
          <Field
            name='city'
            placeholder='Home Town'
            options={{ types: ['(cities)'] }}
            label='Female'
            component={PlaceInput}
            width={8}
          />
          <Divider />
          <Button disabled={pristine || submitting || invalid} size='medium' inverted color="green" content='Update Profile' />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({
  form: 'userProfile',
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(BasicPage);