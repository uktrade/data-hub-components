import React from 'react'
import { mount } from 'enzyme'
import { LINK_COLOUR } from 'govuk-colours'

import ButtonLink from '../ButtonLink'

describe('ButtonLink', () => {
  let wrapper

  describe('Default', () => {
    beforeAll(() => {
      wrapper = mount(<ButtonLink>Test</ButtonLink>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toEqual('Test')
    })

    test('should have styles', () => {
      expect(wrapper).toHaveStyleRule('background', 'transparent')
      expect(wrapper).toHaveStyleRule('box-shadow', 'none')
      expect(wrapper).toHaveStyleRule('color', LINK_COLOUR)
      expect(wrapper).toHaveStyleRule('cursor', 'pointer')
      expect(wrapper).toHaveStyleRule('text-decoration', 'underline')
    })
  })

  describe('Inline', () => {
    beforeAll(() => {
      wrapper = mount(<ButtonLink inline={true}>Inline test</ButtonLink>)
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toEqual('Inline test')
    })

    test('should have styles', () => {
      expect(wrapper).toHaveStyleRule('padding', '0')
      expect(wrapper).toHaveStyleRule('margin', '0')
    })
  })
})
