import React from 'react'
import PropTypes from 'prop-types'
import InputField from '@govuk-react/input-field'

import useField from '../hooks/useField'
import FieldWrapper from './FieldWrapper'

const FieldInput = ({ name, type, validate, required, label, legend, hint, ...rest }) => {
  const { value, error, touched, onChange, onBlur } = useField({ name, validate, required })

  return (
    <FieldWrapper {...({ name, label, legend, hint, error })}>
      <InputField
        key={name}
        meta={{ error, touched }}
        input={{
          id: name,
          type,
          name,
          value,
          onChange,
          onBlur,
          ...rest,
        }}
      />
    </FieldWrapper>
  )
}

FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  validate: PropTypes.func,
  required: PropTypes.string,
  label: PropTypes.string,
  legend: PropTypes.string,
  hint: PropTypes.string,
}

FieldInput.defaultProps = {
  validate: null,
  required: null,
  label: null,
  legend: null,
  hint: null,
}

export default FieldInput
