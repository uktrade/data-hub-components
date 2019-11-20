import React from 'react'
import { mount } from 'enzyme'

import NewWindowLink from '../NewWindowLink'

describe('NewWindowLink', () => {
  let wrapper

  describe('when the "href" prop is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <NewWindowLink href="https://example.com">testChildren</NewWindowLink>
      )
    })

    test('should render the link', () => {
      const linkAttrs = wrapper.find('a').props()
      expect(linkAttrs).toHaveProperty('aria-label', 'Opens in a new window')
      expect(linkAttrs).toHaveProperty('href', 'https://example.com')
      expect(linkAttrs).toHaveProperty('target', '_blank')
      expect(wrapper.text()).toEqual('testChildren (Opens in a new window)')
    })
  })
})
