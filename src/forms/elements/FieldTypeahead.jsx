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
  ...rest
}) => {
  const { value, error, touched, onBlur } = useField({
    name,
    validate,
    required,
  })
  const { setFieldValue } = useFormContext()

  return (
    <FieldWrapper {...{ name, label, legend, hint, error }}>
      <StyledWrapper error={error}>
        {touched && error && <ErrorText>{error}</ErrorText>}
        <Typeahead
          inputId={name}
          aria-label={label || legend}
          onBlur={onBlur}
          onChange={(event) =>
            setFieldValue(name, {
              label: event.label,
              value: event.value,
            })
          }
          error={error}
          defaultValue={value && { label: value.label }}
          {...rest}
        />
      </StyledWrapper>
    </FieldWrapper>
  )
}

FieldTypeahead.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func),
  ]),
  required: PropTypes.string,
  label: PropTypes.node,
  legend: PropTypes.node,
  hint: PropTypes.string,
}

FieldTypeahead.defaultProps = {
  validate: null,
  required: null,
  label: null,
  legend: null,
  hint: null,
}

export default FieldTypeahead
