import React from 'react'
import PropTypes from 'prop-types'
import InputField from '@govuk-react/input-field'
import FormGroup from '@govuk-react/form-group'

import useField from '../hooks/useField'

const FieldInput = ({ name, type, validate, required, label, ...rest }) => {
  const { value, error, touched, onChange, onBlur } = useField({ name, label, validate, required })

  return (
    <FormGroup>
      <InputField
        name={name}
        key={name}
        id={name}
        type={type}
        meta={{ error, touched }}
        input={{
          type,
          value,
          onChange,
          onBlur,
          ...rest,
        }}
      >
        {label}
      </InputField>
    </FormGroup>
  )
}

FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  validate: PropTypes.func,
  required: PropTypes.string,
  label: PropTypes.string,
}

FieldInput.defaultProps = {
  validate: null,
  required: null,
  label: null,
}

export default FieldInput
