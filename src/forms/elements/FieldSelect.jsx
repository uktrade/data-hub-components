import React from 'react'
import PropTypes from 'prop-types'
import Select from '@govuk-react/select'

import useField from '../hooks/useField'

const FieldSelect = ({ name, label, validate, options, emptyOption }) => {
  const { error, touched, onChange, onBlur } = useField({ name, label, validate })

  return (
    <div>
      <Select
        name={name}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        meta={({ error, touched })}
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
    </div>
  )
}

FieldSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validate: PropTypes.func,
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
  label: null,
  options: [],
  emptyOption: 'Please select',
}

export default FieldSelect
