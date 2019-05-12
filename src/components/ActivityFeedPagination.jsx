import React from 'react'
import { Button } from 'govuk-react'

export default class ActivityFeedPagination extends React.Component {
	render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button buttonColour="#dee0e2" buttonTextColour="#000">Show more activity</Button>
      </div>
    )
  }
}
