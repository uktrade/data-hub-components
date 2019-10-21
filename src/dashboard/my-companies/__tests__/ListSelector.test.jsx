import { mount } from 'enzyme'
import React from 'react'
import useMyCompaniesContext from '../useMyCompaniesContext'
import ListSelector from '../ListSelector'
import { withTargetValue } from '../../../utils/enzyme'

const deleteListPropAccessor = (list) => ({
  'data-test': list,
})

const assertDeleteListLinkProps = (wrapper, props) =>
  expect(wrapper.find('a').prop('data-test')).toEqual(props)

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
      <useMyCompaniesContext.Provider
        lists={[{ id: 'foo', name: 'Foo' }]}
        deleteListPropsAccessor={deleteListPropAccessor}
      >
        <ListSelector />
      </useMyCompaniesContext.Provider>
    )
    expect(wrapper.text()).toBe('My Companies ListsFooDelete this list')
    assertDeleteListLinkProps(wrapper, { id: 'foo', name: 'Foo' })
  })

  describe('Three lists', () => {
    test('Render', () => {
      const wrapper = mount(
        <useMyCompaniesContext.Provider
          lists={[
            { id: 'foo', name: 'Foo' },
            { id: 'bar', name: 'Bar' },
            { id: 'bar', name: 'Baz' },
          ]}
          deleteListPropsAccessor={deleteListPropAccessor}
        >
          <ListSelector />
        </useMyCompaniesContext.Provider>
      )
      expect(wrapper.text()).toBe(
        'My Companies ListsView listBarBazFooDelete this list'
      )
      expect(
        wrapper.containsAllMatchingElements([
          <option value={0}>Bar</option>,
          <option value={1}>Baz</option>,
          <option value={2}>Foo</option>,
        ])
      ).toBe(true)
      assertDeleteListLinkProps(wrapper, { id: 'bar', name: 'Bar' })
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
          lists={[
            { id: 'foo', name: 'Foo' },
            { id: 'bar', name: 'Bar' },
            { id: 'baz', name: 'Baz' },
          ]}
          deleteListPropsAccessor={deleteListPropAccessor}
        >
          <ListSelector />
          <Mock />
        </useMyCompaniesContext.Provider>
      )

      assertDeleteListLinkProps(wrapper, { id: 'bar', name: 'Bar' })

      const select = wrapper.find('select')

      select.simulate('change', withTargetValue(2))
      assertDeleteListLinkProps(wrapper, { id: 'foo', name: 'Foo' })

      select.simulate('change', withTargetValue(1))
      assertDeleteListLinkProps(wrapper, { id: 'baz', name: 'Baz' })

      select.simulate('change', withTargetValue(0))
      assertDeleteListLinkProps(wrapper, { id: 'bar', name: 'Bar' })

      select.simulate('change', withTargetValue(1))
      assertDeleteListLinkProps(wrapper, { id: 'baz', name: 'Baz' })

      select.simulate('change', withTargetValue(2))
      assertDeleteListLinkProps(wrapper, { id: 'foo', name: 'Foo' })

      expect(stateHistory).toEqual([0, 2, 1, 0, 1, 2])
    })
  })
})
