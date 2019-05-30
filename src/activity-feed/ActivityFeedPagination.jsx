import React from 'react'
import { Button, LoadingBox } from 'govuk-react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Pagination = styled('div')`
  text-align: center;
  margin-top: 40px;
  margin-bottom: 80px;
`

export default class ActivityFeedPagination extends React.Component {
  static propTypes = {
    onLoadMore: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    isLoading: false,
  }

	render() {
    const { onLoadMore, isLoading } = this.props

    return (
      <Pagination>
        <LoadingBox loading={isLoading} backgroundColorOpacity={1} timeOut={0}>
          <Button disabled={isLoading} onClick={onLoadMore} buttonColour="#dee0e2" buttonTextColour="#000">Show more activity</Button>
        </LoadingBox>
      </Pagination>
    )
  }
}
