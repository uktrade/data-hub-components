import React from 'react'
import {Button} from 'govuk-react'

export default class ActivityFeedPagination extends React.Component {
	render() {
    const {onLoadMore, isLoading} = this.props
    const buttonText = isLoading ? 'Loading...' : 'Show more activity'

    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button disabled={isLoading} onClick={onLoadMore} buttonColour="#dee0e2" buttonTextColour="#000">{buttonText}</Button>
      </div>
    )
  }
}
