import React from 'react'
import { mount } from 'enzyme'
import MyCompaniesTile from '../MyCompaniesTile'
import MyCompaniesTable from '../MyCompaniesTable'
import useMyCompaniesContext from '../useMyCompaniesContext'
import companies from '../../__fixtures__/companies'

const fixture = (lists) =>
  mount(
    <useMyCompaniesContext.Provider lists={lists}>
      <MyCompaniesTile />
    </useMyCompaniesContext.Provider>
  )

describe('My companies dashboard', () => {
  test('No lists', () => {
    const wrapper = fixture([])
    expect(wrapper.find(MyCompaniesTable)).toHaveLength(0)
    expect(wrapper.text()).toBe(
      'My Companies Lists' +
        'You have not yet created any lists with companies.' +
        'You can add companies to lists from a company page, ' +
        'and only you can see these lists.'
    )
  })

  test('One empty list', () => {
    const wrapper = fixture([{ name: 'Foo', companies: [] }])
    expect(wrapper.find(MyCompaniesTable)).toHaveLength(0)
    expect(wrapper.text()).toBe(
      'My Companies Lists' +
        'Foo' +
        'Delete this list' +
        'You have not added any companies to your list.' +
        'You can add companies to this list from a company page, ' +
        'and only you can see this list.'
    )
  })

  describe('Multiple lists', () => {
    test('first empty', () => {
      const wrapper = fixture([
        { name: 'Foo', companies },
        { name: 'Bar', companies: [] },
        { name: 'Baz', companies },
      ])
      expect(wrapper.find(MyCompaniesTable)).toHaveLength(0)
      expect(wrapper.text()).toBe(
        'My Companies Lists' +
          'View list' +
          'Bar' +
          'Baz' +
          'Foo' +
          'Delete this list' +
          'You have not added any companies to your list.' +
          'You can add companies to this list from a company page, ' +
          'and only you can see this list.'
      )
    })

    test('first not empty', () => {
      const wrapper = fixture([
        { name: 'Foo', companies },
        { name: 'Bar', companies },
        { name: 'Baz', companies },
      ])
      expect(wrapper.find(MyCompaniesTable)).toHaveLength(1)
    })
  })
})
