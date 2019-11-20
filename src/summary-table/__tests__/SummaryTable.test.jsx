import React from 'react'
import { mount } from 'enzyme'

import SummaryTable from '../SummaryTable'

describe('SummaryTable', () => {
  let wrapper

  describe('when no props were passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <SummaryTable>
          <SummaryTable.Row>testChildren</SummaryTable.Row>
        </SummaryTable>
      )
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toEqual('testChildren')
    })
  })

  describe('when a "caption" prop is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <SummaryTable caption="testCaption">
          <SummaryTable.Row>testChildren</SummaryTable.Row>
        </SummaryTable>
      )
    })

    test('should render a caption', () => {
      expect(wrapper.text()).toContain('testCaption')
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('testChildren')
    })
  })

  describe('when an "actions" prop is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <SummaryTable actions="testActions">
          <SummaryTable.Row>testChildren</SummaryTable.Row>
        </SummaryTable>
      )
    })

    test('should render actions', () => {
      expect(wrapper.text()).toContain('testActions')
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('testChildren')
    })
  })

  describe('when both "caption" and "actions" props are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <SummaryTable caption="testCaption" actions="testActions">
          <SummaryTable.Row>testChildren</SummaryTable.Row>
        </SummaryTable>
      )
    })

    test('should render caption and actions together', () => {
      expect(wrapper.text()).toContain('testCaptiontestActions')
    })

    test('should set the content with children', () => {
      expect(wrapper.text()).toContain('testChildren')
    })
  })
})

describe('SummaryTable.Row', () => {
  let wrapper

  describe('when children are empty', () => {
    beforeAll(() => {
      wrapper = mount(
        <SummaryTable>
          <SummaryTable.Row />
        </SummaryTable>
      )
    })

    test('should not render a table row', () => {
      expect(wrapper.find('tr')).toHaveLength(0)
    })
  })

  describe('when a "heading" prop is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <SummaryTable>
          <SummaryTable.Row heading="testHeading">
            testChildren
          </SummaryTable.Row>
        </SummaryTable>
      )
    })

    test('should render a TH containing the specified text', () => {
      expect(wrapper.find('th').text()).toContain('testHeading')
    })

    test('should render a TD containing the specified children', () => {
      expect(wrapper.find('td').text()).toContain('testChildren')
    })
  })

  describe('when the "children" are passed as an array', () => {
    beforeAll(() => {
      wrapper = mount(
        <SummaryTable>
          <SummaryTable.Row>{['a', 'b', 'c']}</SummaryTable.Row>
        </SummaryTable>
      )
    })

    test('should render a list containing the specified array elements', () => {
      expect(wrapper.find('li')).toHaveLength(3)
      expect(wrapper.find('ul').text()).toEqual('abc')
    })
  })
})
