import React from 'react'
import { mount } from 'enzyme'

import StatusMessage from '../StatusMessage'
import { Error, Info, Success, Warning } from '../StatusMessageVariant'

const wrapStatusMessage = variant => (
  mount(<StatusMessage variant={variant}>status message</StatusMessage>)
)

describe('StatusMessage', () => {
  describe('Error', () => {
    let wrappedStatusMessage

    beforeAll(() => {
      wrappedStatusMessage = wrapStatusMessage(Error)
    })

    test('should set the content with children', () => {
      expect(wrappedStatusMessage.text()).toEqual('status message')
    })

    test('should have styles', () => {
      expect(wrappedStatusMessage).toHaveStyleRule('border', '5px solid #b10e1e')
      expect(wrappedStatusMessage).toHaveStyleRule('color', '#b10e1e')
      expect(wrappedStatusMessage).toHaveStyleRule('padding', '15px')
      expect(wrappedStatusMessage).toHaveStyleRule('margin-top', '10px')
      expect(wrappedStatusMessage).toHaveStyleRule('font-weight', 'bold')
      expect(wrappedStatusMessage).toHaveStyleRule('line-height', '1.5')
    })
  })

  describe('Info', () => {
    let wrappedStatusMessage

    beforeAll(() => {
      wrappedStatusMessage = wrapStatusMessage(Info)
    })

    test('should set the content with children', () => {
      expect(wrappedStatusMessage.text()).toEqual('status message')
    })

    test('should have styles', () => {
      expect(wrappedStatusMessage).toHaveStyleRule('border', '5px solid #005ea5')
      expect(wrappedStatusMessage).toHaveStyleRule('color', '#005ea5')
      expect(wrappedStatusMessage).toHaveStyleRule('padding', '15px')
      expect(wrappedStatusMessage).toHaveStyleRule('margin-top', '10px')
      expect(wrappedStatusMessage).toHaveStyleRule('font-weight', 'bold')
      expect(wrappedStatusMessage).toHaveStyleRule('line-height', '1.5')
    })
  })

  describe('Success', () => {
    let wrappedStatusMessage

    beforeAll(() => {
      wrappedStatusMessage = wrapStatusMessage(Success)
    })

    test('should set the content with children', () => {
      expect(wrappedStatusMessage.text()).toEqual('status message')
    })

    test('should have styles', () => {
      expect(wrappedStatusMessage).toHaveStyleRule('border', '5px solid #006435')
      expect(wrappedStatusMessage).toHaveStyleRule('color', '#006435')
      expect(wrappedStatusMessage).toHaveStyleRule('padding', '15px')
      expect(wrappedStatusMessage).toHaveStyleRule('margin-top', '10px')
      expect(wrappedStatusMessage).toHaveStyleRule('font-weight', 'bold')
      expect(wrappedStatusMessage).toHaveStyleRule('line-height', '1.5')
    })
  })

  describe('Warning', () => {
    let wrappedStatusMessage

    beforeAll(() => {
      wrappedStatusMessage = wrapStatusMessage(Warning)
    })

    test('should set the content with children', () => {
      expect(wrappedStatusMessage.text()).toEqual('status message')
    })

    test('should have styles', () => {
      expect(wrappedStatusMessage).toHaveStyleRule('border', '5px solid #f47738')
      expect(wrappedStatusMessage).toHaveStyleRule('color', '#f47738')
      expect(wrappedStatusMessage).toHaveStyleRule('padding', '15px')
      expect(wrappedStatusMessage).toHaveStyleRule('margin-top', '10px')
      expect(wrappedStatusMessage).toHaveStyleRule('font-weight', 'bold')
      expect(wrappedStatusMessage).toHaveStyleRule('line-height', '1.5')
    })
  })
})
