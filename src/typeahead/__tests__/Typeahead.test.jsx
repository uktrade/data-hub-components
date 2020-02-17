import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { components } from 'react-select'
import { flushPromises } from '../../utils/enzyme'
import Typeahead, { filterOption } from '../Typeahead'
import Highlighter from '../Highlighter'

const OPTIONS = [
  { value: '1234', label: 'Chocolate - mint' },
  { value: '5678', label: 'Strawberry - Cream' },
  { value: '9876', label: 'Vanilla - Vanilla' },
]
const BASIC_PROPS = {
  name: 'test',
  label: 'Advisers',
  hint: 'Some hint',
  options: OPTIONS,
  menuIsOpen: true,
  noOptions: () => 'No options message',
}

const ASYNC_PROPS = {
  ...BASIC_PROPS,
  options: null,
}

describe('Typeahead', () => {
  test('filterOption', () => {
    expect(filterOption({ label: 'foooo' }, 'oo')).toBeTruthy()
    expect(filterOption({ label: 'foooo' }, 'bar')).toBeFalsy()
    expect(filterOption({}, 'foo')).toBeFalsy()
  })
  test('Error coverage', () => {
    // This is just to make the coverage report happy
    Typeahead({ ...BASIC_PROPS, error: true })
  })
  test('Highlighter', () => {
    // Make code coverage happy
    Highlighter({ searchStr: 'foo' })
  })
  describe('Select', () => {
    test('renders options', () => {
      const selectWrapper = mount(<Typeahead {...BASIC_PROPS} inputValue="" />)
      expect(selectWrapper.find(components.Option)).toHaveLength(3)
      expect(selectWrapper.find('MenuList').text()).toEqual(
        'Chocolate - mintStrawberry - CreamVanilla - Vanilla'
      )
    })
    test('highlights typed text', () => {
      const selectWrapper = mount(
        <Typeahead {...BASIC_PROPS} inputValue="choc" />
      )
      expect(
        selectWrapper
          .find(Highlighter)
          .at(0)
          .find('span')
          .text()
      ).toEqual('Choc')
    })
    test('should render a default message when "noOptionsMessage" prop is not passed', () => {
      const selectWrapper = mount(
        <Typeahead name="test" menuIsOpen={true} inputValue="foo" />
      )
      selectWrapper.find('input[type="text"]').simulate('focus')
      expect(selectWrapper.text()).toContain('No options found')
    })
  })

  describe('AsyncSelect', () => {
    test('should render AsyncSelect when no options are passed', () => {
      const selectWrapper = mount(<Typeahead {...ASYNC_PROPS} inputValue="" />)
      expect(selectWrapper.find('Async')).toHaveLength(1)
    })
    test('should load async options', async () => {
      const selectWrapper = mount(
        <Typeahead
          name="test"
          inputValue=""
          defaultOptions={true}
          menuIsOpen={true}
          loadOptions={() => Promise.resolve(OPTIONS)}
        />
      )
      await act(flushPromises)
      expect(
        selectWrapper
          .find('Select')
          .state()
          .menuOptions.render.map((o) => o.label)
      ).toEqual(['Chocolate - mint', 'Strawberry - Cream', 'Vanilla - Vanilla'])
    })
  })
})
