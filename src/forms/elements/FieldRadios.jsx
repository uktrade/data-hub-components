import React from 'react'
import PropTypes from 'prop-types'
import Radio from '@govuk-react/radio'
import MultiChoice from '@govuk-react/multi-choice'
import styled from 'styled-components'

import useField from '../hooks/useField'
import FieldWrapper from './FieldWrapper'

const StyledChildField = styled('div')`
  margin-left: 55px;
`

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
            children: optionChildren,
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

              {value === optionValue && (
                <StyledChildField>{optionChildren}</StyledChildField>
              )}
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
  label: PropTypes.node,
  legend: PropTypes.node,
  hint: PropTypes.node,
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
