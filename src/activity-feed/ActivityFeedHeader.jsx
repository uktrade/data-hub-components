import React from 'react'
import PropTypes from 'prop-types'
import { H2, Button } from 'govuk-react'
import styled from 'styled-components'

import ActivityFeedFilters from './ActivityFeedFilters'

const HeaderSummary = styled.div`
  display: flex;
  border-bottom: 2px solid #000;
  margin-bottom: 10px;
  padding-bottom: 10px;
`

const HeaderCount = styled.div`
  flex-grow: 1;
  margin-top: 4px;
  & > H2 {
    font-weight: normal;
    font-size: 28px;
    margin-bottom: 0;
  }
`

const HeaderActions = styled.div`
  flex-grow: 1;
  text-align: right;
  & > Button {
    margin-bottom: 0;
  }
`

export default class ActivityFeedHeader extends React.Component {
  static propTypes = {
    totalCards: PropTypes.number.isRequired,
  }

  render() {
    const { totalCards } = this.props

    return (
      <React.Fragment>
        <HeaderSummary>
          <HeaderCount>
            <H2>{totalCards} activities</H2>
          </HeaderCount>
          <HeaderActions>
            <Button buttonColour="#dee0e2" buttonTextColour="#000">Add an interaction</Button>
          </HeaderActions>
        </HeaderSummary>
        <ActivityFeedFilters />
      </React.Fragment>
    )
  }
}
