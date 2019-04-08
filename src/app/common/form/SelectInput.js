import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react'

const SelectInput = ({ input, type, placeholder, multiple, options, meta: { touched, error } }) => {
  return (
    <Form.Field error={touched && !!error}>
      <Select 
        value={input.value || null}
        placeholder={placeholder}
        options={options}
        multiple={multiple}
        onChange={(e, data) => input.onChange(data.value)}
      />
      {
        touched &&
        error &&
        <Label basic color="red">{error}</Label>
      }
    </Form.Field>
  )
}

export default SelectInput;
