import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { BLUE } from 'govuk-colours'

const StyledStatusMessage = styled('div')`
  border: ${({ colour }) => `${SPACING.SCALE_1} solid ${colour}`};
  color: ${({ colour }) => colour};
  padding: ${SPACING.SCALE_3};
  margin-top: ${SPACING.SCALE_2};
  font-weight: bold;
  line-height: 1.5;
`

const StatusMessage = ({ colour, children }) => {
  return (
    <StyledStatusMessage colour={colour}>
      {children}
    </StyledStatusMessage>
  )
}

StatusMessage.propTypes = {
  colour: PropTypes.string,
  children: PropTypes.node.isRequired,
}

StatusMessage.defaultProps = {
  colour: BLUE,
}

export default StatusMessage
