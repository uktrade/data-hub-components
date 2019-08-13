import React from 'react'
import PropTypes from 'prop-types'
import { RED } from 'govuk-colours'

import useField from '../core/useField'
import FieldError from './FieldError'

const FieldInput = ({ name, type, validate, label, ...rest }) => {
  const { value, error, onChange, onBlur } = useField({ name, label, validate })

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        {...rest}
        name={name}
        key={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={error ? { border: `solid 1px ${RED}` } : null}
      />

      <FieldError name={name} />
    </div>
  )
}


FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  validate: PropTypes.func,
  label: PropTypes.string,
}

FieldInput.defaultProps = {
  validate: null,
  label: null,
}

export default FieldInput
