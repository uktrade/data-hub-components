import React from 'react'
import PropTypes from 'prop-types'
import Radio from '@govuk-react/radio'
import MultiChoice from '@govuk-react/multi-choice'

import useField from '../hooks/useField'
import FieldWrapper from './FieldWrapper'

const FieldRadios = ({
  name,
  validate,
  required,
  label,
  legend,
  hint,
  options,
}) => {
  const { value, error, touched, onChange, onBlur } = useField({
    name,
    validate,
    required,
  })

  return (
    <FieldWrapper {...{ name, label, legend, hint, error }}>
      <MultiChoice meta={{ error, touched }}>
        {options.map(
          ({
            label: optionLabel,
            value: optionValue,
            children,
            ...optionProps
          }) => (
            <div key={optionValue}>
              <Radio
                key={optionValue}
                value={optionValue}
                checked={value === optionValue}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                {...optionProps}
              >
                {optionLabel}
              </Radio>

              {value === optionValue && !!children ? children : null}
            </div>
          )
        )}
      </MultiChoice>
    </FieldWrapper>
  )
}

FieldRadios.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func),
  ]),
  required: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  legend: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hint: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      children: PropTypes.node,
    })
  ),
}

FieldRadios.defaultProps = {
  validate: null,
  required: null,
  label: null,
  legend: null,
  hint: null,
  options: [],
}

export default FieldRadios
