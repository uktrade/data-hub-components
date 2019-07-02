import React from 'react'
import styled from 'styled-components'
import { GREY_3 } from 'govuk-colours'
import { SPACING, FONT_SIZE } from '@govuk-react/constants'
import { Link } from 'govuk-react'
import PropTypes from 'prop-types'

const StyledActivityFeedFilters = styled('div')`
  background-color: ${GREY_3};
  padding: ${SPACING.SCALE_2};
`

const StyledLink = styled(Link)`
  font-size: ${FONT_SIZE.SIZE_16};
`
StyledLink.displayName = 'ShowDetails'

export default class ActivityFeedFilters extends React.PureComponent {
  static propTypes = {
    onShowDetailsClick: PropTypes.func.isRequired,
    showDetails: PropTypes.bool.isRequired,
  }

  render() {
    const { onShowDetailsClick, showDetails } = this.props

    const onClick = (e) => {
      e.preventDefault()
      onShowDetailsClick()
    }

    return (
      <StyledActivityFeedFilters>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <StyledLink href="#" onClick={onClick}>{ showDetails ? 'Hide' : 'Show' } details for all activities</StyledLink>
      </StyledActivityFeedFilters>
    )
  }
}
