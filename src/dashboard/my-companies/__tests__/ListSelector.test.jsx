import { mount } from 'enzyme'
import React from 'react'
import useMyCompaniesContext from '../useMyCompaniesContext'
import ListSelector from '../ListSelector'

// https://github.com/facebook/create-react-app/issues/6398#issuecomment-462475835

describe('ListSelector', () => {
  test('No lists', () => {
    const wrapper = mount(
      <useMyCompaniesContext.Provider>
        <ListSelector />
      </useMyCompaniesContext.Provider>,
    )
    expect(wrapper.text()).toBe('My companies list')
  })

  test('One list', () => {
    const wrapper = mount(
      <useMyCompaniesContext.Provider lists={[{ name: 'Foo' }]}>
        <ListSelector />
      </useMyCompaniesContext.Provider>,
    )
    expect(wrapper.text()).toBe('My companies listFooEdit lists')
  })

  test('Three list', () => {
    const wrapper = mount(
      <useMyCompaniesContext.Provider
        lists={[
          {
            name: 'Foo',
          },
          {
            name: 'Bar',
          },
          {
            name: 'Baz',
          },
        ]}
      >
        <ListSelector />
      </useMyCompaniesContext.Provider>,
    )
    expect(wrapper.text()).toBe('My companies listView listsBarBazFooEdit lists')
    expect(wrapper.containsAllMatchingElements([
      <option value={0}>Bar</option>,
      <option value={1}>Baz</option>,
      <option value={2}>Foo</option>,
    ])).toBe(true)
  })
})
