import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '@govuk-react/form-group'
import Label from '@govuk-react/label'
import styled from 'styled-components'
import HintText from '@govuk-react/hint-text'
import { ERROR_COLOUR } from 'govuk-colours'
import { BORDER_WIDTH_FORM_ELEMENT_ERROR, SPACING } from '@govuk-react/constants'

const StyledFieldset = styled('fieldset')`
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`

const StyledLegend = styled('legend')`
  box-sizing: border-box;
  display: table;
  white-space: normal;
  padding: 0;
  margin: 0;
  padding-bottom: ${SPACING.SCALE_1};
  * {
    margin-bottom: ${SPACING.SCALE_1} !important;
  }
  ${props => props.error && `
    border-left: ${BORDER_WIDTH_FORM_ELEMENT_ERROR} solid ${ERROR_COLOUR};
    margin-right: ${SPACING.SCALE_3};
    padding-left: ${SPACING.SCALE_2};
  `}
`

const StyledLabel = styled(Label)`
  padding-bottom: ${SPACING.SCALE_1};
`

const FieldInner = ({ legend, error, children }) => (
  legend
    ? <StyledFieldset><StyledLegend error={error}>{legend}</StyledLegend>{children}</StyledFieldset>
    : children
)

FieldInner.propTypes = {
  legend: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
}

FieldInner.defaultProps = {
  legend: null,
  error: null,
  children: null,
}

const StyledHint = styled(HintText)`
  padding: 0;
  margin: 0;
  padding-bottom: ${SPACING.SCALE_2};
  ${props => props.error && `
    border-left: ${BORDER_WIDTH_FORM_ELEMENT_ERROR} solid ${ERROR_COLOUR};
    margin-right: ${SPACING.SCALE_3};
    padding-left: ${SPACING.SCALE_2};
    padding-bottom: ${SPACING.SCALE_1};
  `}
`

const FieldWrapper = ({ name, label, legend, hint, error, children }) => (
  <FormGroup>
    <FieldInner legend={legend} error={error}>
      { label && <StyledLabel error={error} htmlFor={name}>{label}</StyledLabel> }
      { hint && <StyledHint error={error}>{hint}</StyledHint> }
      { children }
    </FieldInner>
  </FormGroup>
)

FieldWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  legend: PropTypes.string,
  hint: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
}

FieldWrapper.defaultProps = {
  label: null,
  legend: null,
  hint: null,
  error: null,
  children: null,
}

export default FieldWrapper
