import React from 'react'
import PropTypes from 'prop-types'
import Radio from '@govuk-react/radio'
import MultiChoice from '@govuk-react/multi-choice'

import useField from '../core/useField'

const FieldRadios = ({ name, validate, label, options, ...rest }) => {
  const { value, error, touched, onChange, onBlur } = useField({ name, label, validate })

  return (
    <div>
      <MultiChoice label={label} meta={({ error, touched })}>
        {options.map(({ label: optionLabel, value: optionValue, children }) => (
          <div key={optionValue}>
            <Radio
              key={optionValue}
              value={optionValue}
              checked={value === optionValue}
              onChange={onChange}
              onBlur={onBlur}
              {...rest}
            >
              {optionLabel}
            </Radio>

            {value === optionValue && !!children ? children : null}
          </div>
        ))}
      </MultiChoice>
    </div>
  )
}

FieldRadios.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      children: PropTypes.node,
    }),
  ),
}

FieldRadios.defaultProps = {
  validate: null,
  label: null,
  options: [],
}

export default FieldRadios
