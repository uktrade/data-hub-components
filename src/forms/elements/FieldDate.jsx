import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { castArray } from 'lodash'
import styled from 'styled-components'
import { ERROR_COLOUR } from 'govuk-colours'
import ErrorText from '@govuk-react/error-text'
import Label from '@govuk-react/label'
import Input from '@govuk-react/input'
import LabelText from '@govuk-react/label-text'
import {
  BORDER_WIDTH_FORM_ELEMENT_ERROR,
  SPACING,
} from '@govuk-react/constants'

import FieldWrapper from './FieldWrapper'
import useField from '../hooks/useField'
import { useFormContext } from '../..'

const VALIDATION_DATE_FORMAT = 'YYYY-MM-DD'
const DAY = 'day'
const MONTH = 'month'
const YEAR = 'year'

const StyledInputWrapper = styled('div')`
  ${(props) =>
    props.error &&
    `
    border-left: ${BORDER_WIDTH_FORM_ELEMENT_ERROR} solid ${ERROR_COLOUR};
    margin-right: ${SPACING.SCALE_3};
    padding-left: ${SPACING.SCALE_2};
  `}
`

const StyledLabel = styled(Label)(
  {
    marginRight: '20px',
    marginBottom: 0,
  },
  ({ year }) => ({
    width: year ? '70px' : '50px',
  })
)

const StyledList = styled('div')({
  display: 'flex',
})

const getValidator = (required) => ({ day, month, year }) => {
  const isDateValid = moment(
    `${year}-${month}-${day}`,
    VALIDATION_DATE_FORMAT,
    true
  ).isValid()
  const isDateEmpty = !day && !month && !year

  return !isDateValid && (!isDateEmpty || required)
    ? required || 'Enter a valid date'
    : null
}

const FieldDate = ({ name, label, hint, validate, labels, required }) => {
  const { value, error, touched, onBlur } = useField({
    name,
    initialValue: {
      day: '',
      month: '',
      year: '',
    },
    validate: [getValidator(required), ...castArray(validate)],
  })

  const { setFieldValue } = useFormContext()

  const onChange = (valueKey, e) => {
    setFieldValue(name, {
      ...value,
      [valueKey]: e.target.value,
    })
  }

  return (
    <FieldWrapper {...{ name, label, hint, error }}>
      <StyledInputWrapper error={error}>
        {error && <ErrorText>{error}</ErrorText>}
        <StyledList>
          <StyledLabel>
            <LabelText>{labels.day}</LabelText>
            <Input
              id={`${name}.day`}
              name={`${name}.day`}
              error={touched && error}
              type="number"
              value={value.day}
              onChange={(e) => onChange(DAY, e)}
              onBlur={onBlur}
            />
          </StyledLabel>
          <StyledLabel>
            <LabelText>{labels.month}</LabelText>
            <Input
              id={`${name}.month`}
              name={`${name}.month`}
              error={touched && error}
              type="number"
              value={value.month}
              onChange={(e) => onChange(MONTH, e)}
              onBlur={onBlur}
            />
          </StyledLabel>
          <StyledLabel year={true}>
            <LabelText>{labels.year}</LabelText>
            <Input
              id={`${name}.year`}
              name={`${name}.year`}
              error={touched && error}
              type="number"
              value={value.year}
              onChange={(e) => onChange(YEAR, e)}
              onBlur={onBlur}
            />
          </StyledLabel>
        </StyledList>
      </StyledInputWrapper>
    </FieldWrapper>
  )
}

FieldDate.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  hint: PropTypes.string,
  required: PropTypes.string,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func),
  ]),
  labels: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
  }),
}

FieldDate.defaultProps = {
  label: null,
  hint: null,
  required: null,
  validate: null,
  labels: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
}

export default FieldDate
