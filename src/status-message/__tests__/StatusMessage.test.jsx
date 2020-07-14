import React from 'react'
import { mount } from 'enzyme'
import { ERROR_COLOUR } from 'govuk-colours'

import StatusMessage from '../StatusMessage'

const wrapStatusMessage = (colour) =>
  mount(<StatusMessage colour={colour}>status message</StatusMessage>)

describe('StatusMessage', () => {
  describe('Default', () => {
    let wrappedStatusMessage

    beforeAll(() => {
      wrappedStatusMessage = wrapStatusMessage()
    })

    test('should set the content with children', () => {
      expect(wrappedStatusMessage.text()).toEqual('status message')
    })

    test('should have styles', () => {
      expect(wrappedStatusMessage).toHaveStyleRule(
        'border',
        '5px solid #1d70b8'
      )
      expect(wrappedStatusMessage).toHaveStyleRule('color', '#1d70b8')
      expect(wrappedStatusMessage).toHaveStyleRule('padding', '15px')
      expect(wrappedStatusMessage).toHaveStyleRule('margin-bottom', '20px')
      expect(wrappedStatusMessage).toHaveStyleRule('font-weight', 'bold')
      expect(wrappedStatusMessage).toHaveStyleRule('line-height', '1.5')
      expect(wrappedStatusMessage).toHaveStyleRule(
        'outline',
        '3px solid #ffdd00',
        {
          modifier: ':focus',
        }
      )
    })
  })

  describe('With custom colour', () => {
    let wrappedStatusMessage

    beforeAll(() => {
      wrappedStatusMessage = wrapStatusMessage(ERROR_COLOUR)
    })

    test('should set the content with children', () => {
      expect(wrappedStatusMessage.text()).toEqual('status message')
    })

    test('should have styles', () => {
      expect(wrappedStatusMessage).toHaveStyleRule(
        'border',
        '5px solid #d4351c'
      )
      expect(wrappedStatusMessage).toHaveStyleRule('color', '#d4351c')
      expect(wrappedStatusMessage).toHaveStyleRule('padding', '15px')
      expect(wrappedStatusMessage).toHaveStyleRule('margin-bottom', '20px')
      expect(wrappedStatusMessage).toHaveStyleRule('font-weight', 'bold')
      expect(wrappedStatusMessage).toHaveStyleRule('line-height', '1.5')
      expect(wrappedStatusMessage).toHaveStyleRule(
        'outline',
        '3px solid #ffdd00',
        {
          modifier: ':focus',
        }
      )
    })
  })
})
