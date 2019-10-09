import React from 'react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import Checkbox from '@govuk-react/checkbox'
import PropTypes from 'prop-types'

const StyledActivityFeedFilters = styled('div')`
  padding: ${SPACING.SCALE_2};
`

export default class ShowDetailsFilter extends React.PureComponent {
  static propTypes = {
    onShowDetailsClick: PropTypes.func.isRequired,
    showDetails: PropTypes.bool.isRequired,
  }

  render() {
    const { onShowDetailsClick, showDetails } = this.props

    return (
      <StyledActivityFeedFilters>
        <Checkbox onChange={onShowDetailsClick} checked={showDetails}>
          Show details for all activities
        </Checkbox>
      </StyledActivityFeedFilters>
    )
  }
}
