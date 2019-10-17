import { mount } from 'enzyme'
import React from 'react'
import useMyCompaniesContext from '../useMyCompaniesContext'
import ListSelector from '../ListSelector'
import { withTargetValue } from '../../../utils/enzyme'

describe('ListSelector', () => {
  test('No lists', () => {
    const wrapper = mount(
      <useMyCompaniesContext.Provider>
        <ListSelector />
      </useMyCompaniesContext.Provider>
    )
    expect(wrapper.text()).toBe('My Companies Lists')
  })

  test('One list', () => {
    const wrapper = mount(
      <useMyCompaniesContext.Provider lists={[{ name: 'Foo' }]}>
        <ListSelector />
      </useMyCompaniesContext.Provider>
    )
    expect(wrapper.text()).toBe('My Companies ListsFooEdit lists')
  })

  describe('Three lists', () => {
    test('Render', () => {
      const wrapper = mount(
        <useMyCompaniesContext.Provider
          lists={[{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }]}
        >
          <ListSelector />
        </useMyCompaniesContext.Provider>
      )
      expect(wrapper.text()).toBe(
        'My Companies ListsView listBarBazFooEdit lists'
      )
      expect(
        wrapper.containsAllMatchingElements([
          <option value={0}>Bar</option>,
          <option value={1}>Baz</option>,
          <option value={2}>Foo</option>,
        ])
      ).toBe(true)
    })

    test('Interaction to state', () => {
      const stateHistory = []
      const Mock = () => {
        const { state } = useMyCompaniesContext()
        stateHistory.push(state.selectedIdx)
        return null
      }

      const wrapper = mount(
        <useMyCompaniesContext.Provider
          lists={[{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }]}
        >
          <ListSelector />
          <Mock />
        </useMyCompaniesContext.Provider>
      )

      wrapper
        .find('select')
        .simulate('change', withTargetValue(2))
        .simulate('change', withTargetValue(1))
        .simulate('change', withTargetValue(0))
        .simulate('change', withTargetValue(1))
        .simulate('change', withTargetValue(2))

      expect(stateHistory).toEqual([0, 2, 1, 0, 1, 2])
    })
  })
})
