import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { ERROR_COLOUR, BLUE, GREEN, ORANGE } from 'govuk-colours'

import { Error, Info, Success, Warning } from './StatusMessageVariant'

const Colours = {
  [Error]: ERROR_COLOUR,
  [Info]: BLUE,
  [Success]: GREEN,
  [Warning]: ORANGE,
}

const StyledStatusMessage = styled('div')`
  border: ${({ variant }) => `${SPACING.SCALE_1} solid ${Colours[variant]}`};
  color: ${({ variant }) => Colours[variant]};
  padding: ${SPACING.SCALE_3};
  margin-top: ${SPACING.SCALE_2};
  font-weight: bold;
  line-height: 1.5;
`

const StatusMessage = ({ variant, children }) => {
  return (
    <StyledStatusMessage variant={variant}>
      {children}
    </StyledStatusMessage>
  )
}

StatusMessage.propTypes = {
  variant: PropTypes.oneOf([
    Error,
    Info,
    Success,
    Warning,
  ]).isRequired,
  children: PropTypes.node.isRequired,
}

export default StatusMessage
