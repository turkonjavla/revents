import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ input, width, placeholder, meta: { touched, error }, ...rest}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={input.value ? moment(input.value) : null}
        onChange={input.onChange}
      />
      {
        touched &&
        error &&
        <Label basic color="red"></Label>
      }
    </Form.Field>
  )
}

export default DateInput;
