import React from 'react'
import PropTypes from 'prop-types'
import Select from '@govuk-react/select'
import FormGroup from '@govuk-react/form-group'

import useField from '../hooks/useField'

const FieldSelect = ({ name, label, validate, required, options, emptyOption, ...rest }) => {
  const { error, touched, value, onChange, onBlur } = useField({ name, label, validate, required })

  return (
    <FormGroup>
      <Select
        name={name}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        meta={({ error, touched })}
        input={{
          defaultValue: value,
          ...rest,
        }}
      >
        {emptyOption && <option key="" value="">{emptyOption}</option>}
        {options.map(({ label: optionLabel, value: optionValue }) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {optionLabel}
          </option>
        ))}
      </Select>
    </FormGroup>
  )
}

FieldSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validate: PropTypes.func,
  required: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  emptyOption: PropTypes.string,
}

FieldSelect.defaultProps = {
  validate: null,
  required: null,
  label: null,
  options: [],
  emptyOption: 'Please select',
}

export default FieldSelect
