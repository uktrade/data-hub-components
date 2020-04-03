import React from 'react'
import { mount } from 'enzyme'
import Panel from '../../Panel'

describe('Panel', () => {
  const wrapper = mount(
    <Panel title="Title for the panel">
      <p>I am some content</p>
    </Panel>
  )
  test('should render a title', () => {
    expect(wrapper.find('h2').text()).toBe('Title for the panel')
  })
  test('should render content', () => {
    expect(wrapper.find('p').text()).toBe('I am some content')
  })
})
