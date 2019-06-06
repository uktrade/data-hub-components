import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import ActivityFeedPagination from './ActivityFeedPagination'

describe('ActivityFeedPagination', () => {
  test('renders default pagination', () => {
    const tree = renderer
      .create(<ActivityFeedPagination />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders pagination with loader', () => {
    const tree = renderer
      .create(
        <ActivityFeedPagination isLoading={true} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders pagination with loader', () => {
    const tree = renderer
      .create(
        <ActivityFeedPagination
          isLoading={true}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('simulates click events', () => {
    const onLoadMoreClick = jest.fn()
    const wrapper = <ActivityFeedPagination
      isLoading={false}
      onLoadMore={onLoadMoreClick}
    />

    mount(wrapper)
      .find('button')
      .simulate('click')
    expect(onLoadMoreClick).toHaveBeenCalledTimes(1)
  })
})




