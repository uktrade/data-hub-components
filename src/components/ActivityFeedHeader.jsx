import React from 'react'
import PropTypes from 'prop-types'
import { H2, Button } from 'govuk-react'

import ActivityFeedFilters from './ActivityFeedFilters'

export default class ActivityFeedHeader extends React.Component {
  static propTypes = {
    totalCards: PropTypes.number.isRequired,
  }

  render() {
    const { totalCards } = this.props

    return (
      <React.Fragment>
        <div style={{ display: 'flex', borderBottom: '2px solid #000', marginBottom: '10px', paddingBottom: '10px' }}>
          <div style={{ flexGrow: 1, marginTop: '4px' }}>
            <H2 style={{ fontWeight: 'normal', fontSize: '28px', marginBottom: 0 }}>{totalCards} activities</H2>
          </div>
          <div style={{ flexGrow: 1, textAlign: 'right' }}>
            <Button buttonColour="#dee0e2" buttonTextColour="#000" style={{ marginBottom: 0 }}>Add an interaction</Button>
          </div>
        </div>
        <ActivityFeedFilters />
      </React.Fragment>
    )
  }
}
