import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

const StyledEntityListHeader = styled('div')`
  border: ${({ colour }) => `${SPACING.SCALE_1} solid ${colour}`};
  color: ${({ colour }) => colour};
  padding: ${SPACING.SCALE_3};
  margin-top: ${SPACING.SCALE_2};
  font-weight: bold;
  line-height: 1.5;
`

const EntityListHeader = ({ colour, children }) => {
  return (
    <StyledEntityListHeader colour={colour}>
      {children}
    </StyledEntityListHeader>
  )
}

EntityListHeader.propTypes = {
  colour: PropTypes.string.isRequired,
  children: PropTypes.node,
}

EntityListHeader.defaultProps = {
  children: null,
}

export default EntityListHeader
