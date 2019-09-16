import React from 'react'
import PropTypes from 'prop-types'
import Select from '@govuk-react/select'

import useField from '../hooks/useField'
import FieldWrapper from './FieldWrapper'

const FieldSelect = ({
  name,
  label,
  legend,
  hint,
  validate,
  required,
  options,
  emptyOption,
  ...rest
}) => {
  const { error, touched, value, onChange, onBlur } = useField({ name, validate, required })

  return (
    <FieldWrapper {...({ name, label, legend, hint, error })}>
      <Select
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        meta={({ error, touched })}
        input={{
          id: name,
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
    </FieldWrapper>
  )
}

FieldSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  legend: PropTypes.string,
  hint: PropTypes.string,
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
  legend: null,
  hint: null,
  options: [],
  emptyOption: 'Please select',
}

export default FieldSelect