import Select from '@govuk-react/select'
import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES, SPACING } from '@govuk-react/constants'
import { GREY_2, GREY_3, GREY_4 } from 'govuk-colours'
import Checkbox from '@govuk-react/checkbox'
import PropTypes from 'prop-types'

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

const StyledDropdownContainer = styled('div')`
  background: ${GREY_4};
  padding: ${SPACING.SCALE_1}
  display: block;
  
  ${MEDIA_QUERIES.DESKTOP} {
    display: inline-flex;
  }
  
  label {
    display: block;
    
    ${MEDIA_QUERIES.DESKTOP} {
      display: inline-block;
    }
    
    span {
      display: inline-block;
      margin: 0 ${SPACING.SCALE_2}
      width: auto;
      margin: 0;

      
      ${MEDIA_QUERIES.DESKTOP} {
        margin: 0 10px;
      }
    }
    
    select {
      width: 100%;
      
      ${MEDIA_QUERIES.DESKTOP} {
        width: auto;
      }
    }
  } 
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
      border-width: 0 0 4px 4px;
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
    onShowDetailsClick: PropTypes.func.isRequired,
    showDetails: PropTypes.bool.isRequired,
  }

  render() {
    const { onShowDetailsClick, showDetails } = this.props

    return (
      <StyledBasicFiltersContainer>
        <StyledActivityFeedFilterTitle>
          <StyledTitle>Filter by</StyledTitle>
        </StyledActivityFeedFilterTitle>
        <StyledDropdownContainer>
          <Select name="activity-types-filter" label="Activity types">
            <option value="All Data Hub & external activity">
              All Data Hub & external activity
            </option>
            <option value="All Data Hub activity">All Data Hub activity</option>
            <option value="All external activity">All external activity</option>
          </Select>
        </StyledDropdownContainer>
        <StyledHr />
        <StyledCheckbox onChange={onShowDetailsClick} checked={showDetails}>
          Show details for all activities
        </StyledCheckbox>
      </StyledBasicFiltersContainer>
    )
  }
}
