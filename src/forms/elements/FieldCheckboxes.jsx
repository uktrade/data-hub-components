import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@govuk-react/checkbox'
import MultiChoice from '@govuk-react/multi-choice'

import useField from '../hooks/useField'
import FieldWrapper from './FieldWrapper'
import useFormContext from '../hooks/useFormContext'

const FieldCheckboxes = ({
  name,
  validate,
  required,
  label,
  legend,
  hint,
  options,
}) => {
  const { value, error, touched, onBlur } = useField({
    name,
    validate,
    required,
  })
  const { setFieldValue } = useFormContext()

  const onChange = (e) => {
    const { name: optionName, checked } = e.target
    let newValue = Array.isArray(value) ? [...value] : []

    if (checked) {
      newValue.push(optionName)
    } else if (newValue.includes(optionName)) {
      newValue = newValue.filter((item) => item !== optionName)
    }

    setFieldValue(name, newValue)
  }

  return (
    <FieldWrapper {...{ name, label, legend, hint, error }}>
      <MultiChoice meta={{ error, touched }}>
        {options.map(
          ({
            value: optionValue,
            label: optionLabel,
            children,
            ...optionProps
          }) => (
            <div key={optionValue}>
              <Checkbox
                key={optionValue}
                name={optionValue}
                checked={value.includes(optionValue)}
                onChange={onChange}
                onBlur={onBlur}
                {...optionProps}
              >
                {optionLabel}
              </Checkbox>

              {value.includes(optionValue) && !!children ? children : null}
            </div>
          )
        )}
      </MultiChoice>
    </FieldWrapper>
  )
}

FieldCheckboxes.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func),
  ]),
  required: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  legend: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      children: PropTypes.node,
    })
  ),
}

FieldCheckboxes.defaultProps = {
  validate: null,
  required: null,
  label: null,
  legend: null,
  hint: null,
  options: [],
}

export default FieldCheckboxes
