import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Input from '@govuk-react/input'
import ErrorText from '@govuk-react/error-text'
import {
  BORDER_WIDTH_FORM_ELEMENT_ERROR,
  SPACING,
} from '@govuk-react/constants'
import { ERROR_COLOUR } from 'govuk-colours'

import useField from '../hooks/useField'
import FieldWrapper from './FieldWrapper'

const StyledInputWrapper = styled('div')`
  ${(props) =>
    props.error &&
    `
    border-left: ${BORDER_WIDTH_FORM_ELEMENT_ERROR} solid ${ERROR_COLOUR};
    margin-right: ${SPACING.SCALE_3};
    padding-left: ${SPACING.SCALE_2};
  `}
`

const FieldInput = ({
  name,
  type,
  validate,
  required,
  label,
  legend,
  hint,
  ...rest
}) => {
  const { value, error, touched, onChange, onBlur } = useField({
    name,
    validate,
    required,
  })

  return (
    <FieldWrapper {...{ name, label, legend, hint, error }}>
      <StyledInputWrapper error={error}>
        {touched && error && <ErrorText>{error}</ErrorText>}
        <Input
          key={name}
          error={touched && error}
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        />
      </StyledInputWrapper>
    </FieldWrapper>
  )
}

FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func),
  ]),
  required: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  legend: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

FieldInput.defaultProps = {
  validate: null,
  required: null,
  label: null,
  legend: null,
  hint: null,
}

export default FieldInput
