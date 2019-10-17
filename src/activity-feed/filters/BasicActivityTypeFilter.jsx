import React from 'react'
import styled from 'styled-components'
import {
  MEDIA_QUERIES,
  SPACING,
  BORDER_WIDTH_MOBILE,
} from '@govuk-react/constants'
import { GREY_2, GREY_3 } from 'govuk-colours'
import Checkbox from '@govuk-react/checkbox'
import PropTypes from 'prop-types'
import SelectFilter from './SelectFilter'

const StyledBasicFiltersContainer = styled('div')`
  padding: ${SPACING.SCALE_2};
  background: ${GREY_3};
`

const StyledActivityFeedFilterTitle = styled('div')`
  padding: 0;
  margin: 0;
  width: auto;
  display: block;

  ${MEDIA_QUERIES.DESKTOP} {
    display: inline-block;
  }
`

const StyledTitle = styled('h4')`
  margin: ${SPACING.SCALE_2} ${SPACING.SCALE_4} ${SPACING.SCALE_2} 0;
`

const StyledHr = styled('hr')`
  margin: ${SPACING.SCALE_2} 0;
  border-style: double;
  border-color: ${GREY_2};
`

const StyledCheckbox = styled(Checkbox)`
  min-height: 26px;
  margin-bottom: 0;

  & > span {
    margin: 0;
    padding: 0;

    &::before {
      background: white;
      width: 26px;
      height: 26px;
    }

    &::after {
      top: 6px;
      left: 5px;
      width: 12px;
      height: 6px;
      border-width: 0 0 ${BORDER_WIDTH_MOBILE} ${BORDER_WIDTH_MOBILE};
    }
  }

  input {
    width: 26px;
    height: 26px;
    margin: 0;
    padding: 0;
  }
`

export default class BasicActivityTypeFilter extends React.PureComponent {
  static propTypes = {
    activityTypeFilters: PropTypes.array.isRequired,
    filteredActivity: PropTypes.array.isRequired,
    onActivityTypeFilterChange: PropTypes.func.isRequired,
    onShowDetailsClick: PropTypes.func.isRequired,
    showDetails: PropTypes.bool.isRequired,
  }

  render() {
    const {
      activityTypeFilters,
      filteredActivity,
      onActivityTypeFilterChange,
      onShowDetailsClick,
      showDetails,
    } = this.props

    return (
      <StyledBasicFiltersContainer>
        <StyledActivityFeedFilterTitle>
          <StyledTitle>Filter by</StyledTitle>
        </StyledActivityFeedFilterTitle>
        <SelectFilter
          filters={activityTypeFilters}
          onActivityTypeFilterChange={onActivityTypeFilterChange}
          value={filteredActivity}
        />
        <StyledHr />
        <StyledCheckbox onChange={onShowDetailsClick} checked={showDetails}>
          Show details for all activities
        </StyledCheckbox>
      </StyledBasicFiltersContainer>
    )
  }
}
