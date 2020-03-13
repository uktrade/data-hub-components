import React from 'react'
import { mount } from 'enzyme'
import ActivityFeedAction from '../ActivityFeedAction'

describe('ActivityFeedAction', () => {
  let wrapper

  beforeAll(() => {
    wrapper = mount(
      <ActivityFeedAction
        text="Test button"
        link="http://testing.example.com"
      />
    )
  })

  test('should render the component', () => {
    expect(wrapper.find(ActivityFeedAction).exists()).toBe(true)
  })

  test('should render the text', () => {
    expect(wrapper.find(ActivityFeedAction).text()).toBe('Test button')
  })

  test('should render the button with a link', () => {
    expect(wrapper.find("a[href='http://testing.example.com']")).toHaveLength(1)
  })
})
