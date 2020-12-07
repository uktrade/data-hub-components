import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ErrorText from '@govuk-react/error-text'
import {
  BORDER_WIDTH_FORM_ELEMENT_ERROR,
  SPACING,
} from '@govuk-react/constants'
import { ERROR_COLOUR } from 'govuk-colours'

import useField from '../hooks/useField'
import FieldWrapper from './FieldWrapper'
import Typeahead from '../../typeahead/Typeahead'
import useFormContext from '../hooks/useFormContext'

const StyledWrapper = styled('div')`
  ${(props) =>
    props.error &&
    `
    border-left: ${BORDER_WIDTH_FORM_ELEMENT_ERROR} solid ${ERROR_COLOUR};
    margin-right: ${SPACING.SCALE_3};
    padding-left: ${SPACING.SCALE_2};
  `}
  textarea {
    width: 100%;
  }
`

const FieldTypeahead = ({
  name,
  validate,
  required,
  label,
  legend,
  hint,
  initialValue,
  errorMessage,
  ...rest
}) => {
  const { value, error, touched, onBlur } = useField({
    name,
    validate,
    required,
    initialValue,
  })
  const { setFieldValue } = useFormContext()
  const hasError = !!(error || errorMessage)

  return (
    <FieldWrapper {...{ name, label, legend, hint, error }}>
      <StyledWrapper error={hasError}>
        {(errorMessage || (touched && error)) && (
          <ErrorText>{errorMessage || error}</ErrorText>
        )}
        <Typeahead
          inputId={name}
          aria-label={label || legend}
          onBlur={onBlur}
          onChange={(newValue) => setFieldValue(name, newValue)}
          error={hasError}
          value={value}
          {...rest}
        />
      </StyledWrapper>
    </FieldWrapper>
  )
}

FieldTypeahead.propTypes = {
  ...Typeahead.propTypes,
  name: PropTypes.string.isRequired,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func),
  ]),
  required: PropTypes.string,
  label: PropTypes.node,
  legend: PropTypes.node,
  hint: PropTypes.string,
  initialValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
}

FieldTypeahead.defaultProps = {
  validate: null,
  required: null,
  label: null,
  legend: null,
  hint: null,
  initialValue: null,
}

export default FieldTypeahead
