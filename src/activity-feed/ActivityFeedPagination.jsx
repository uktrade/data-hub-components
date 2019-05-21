import React from 'react'
import {Button} from 'govuk-react'
import styled from 'styled-components'

const Pagination = styled('div')`
  text-align: center;
  margin-top: 40px;
`

export default class ActivityFeedPagination extends React.Component {
	render() {
    const {onLoadMore, isLoading} = this.props
    const buttonText = isLoading ? 'Loading...' : 'Show more activity'

    return (
      <Pagination>
        <Button disabled={isLoading} onClick={onLoadMore} buttonColour="#dee0e2" buttonTextColour="#000">{buttonText}</Button>
      </Pagination>
    )
  }
}
