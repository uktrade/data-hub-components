import React from 'react'
import { mount } from 'enzyme'
import MyCompaniesTile from '../MyCompaniesTile'
import useMyCompaniesContext from '../useMyCompaniesContext'
import companies from '../../__fixtures__/companies'

describe('My companies dashboard', () => {
  test('should match the snapshot', () => {
    const wrapper = mount(
      <useMyCompaniesContext.Provider mockInitialState={{ companiesInitial: companies, companies }}>
        <MyCompaniesTile />
      </useMyCompaniesContext.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
  describe('when there are a list of companies', () => {
    const wrapper = mount(
      <useMyCompaniesContext.Provider mockInitialState={{ companiesInitial: companies, companies }}>
        <MyCompaniesTile />
      </useMyCompaniesContext.Provider>,
    )
    test('should render filters', () => {
      expect(wrapper.find('input[type="text"]')).toHaveLength(1)
      expect(wrapper.find('select')).toHaveLength(1)
    })
    test('should render a table', () => {
      expect(wrapper.find('table')).toHaveLength(1)
    })
    test('should render help text', () => {
      expect(wrapper.find('details')).toHaveLength(1)
    })
  })
  describe('when there are no companies', () => {
    const wrapper = mount(
      <useMyCompaniesContext.Provider data={[]}>
        <MyCompaniesTile />
      </useMyCompaniesContext.Provider>,
    )
    test('should not render filters', () => {
      expect(wrapper.find('input[type="text"]')).toHaveLength(0)
      expect(wrapper.find('select')).toHaveLength(0)
    })
    test('should not render a table', () => {
      expect(wrapper.find('table')).toHaveLength(0)
    })
    test('should not render help text', () => {
      expect(wrapper.find('details')).toHaveLength(0)
    })
    test('should render no companies message', () => {
      expect(wrapper.find('p').text()).toContain('You have not added any companies to your list. You can add companies to this list from a company page, and only you can see this list.')
    })
  })
  describe('Search for companies', () => {
    test('should filter a search result', () => {
      const wrapper = mount(
        <useMyCompaniesContext.Provider
          mockInitialState={{ companiesInitial: companies, companies }}
        >
          <MyCompaniesTile />
        </useMyCompaniesContext.Provider>,
      )
      wrapper.find('input').simulate('change', { target: { value: 'z' } })
      expect(wrapper.find('table').text()).toContain('Zebra')
      expect(wrapper.find('tbody')).toHaveLength(1)
    })
  })
  describe('when text filter doesn\'nt match any companies', () => {
    const companiesInitial = [
      {
        company: {
          name: 'A1 BMW LTD!!!!!',
        },
        latestInteraction: {
          id: '79d92719-7402-45b6-b3d7-eff559d6b282',
          date: '2019-08-14',
          displayDate: '14 Aug 19',
          subject:
            'Here is a long interaction title some more text some more text some more text almost finished some more text nearly there more text finished',
        },
      },
    ]
    const wrapper = mount(
      <useMyCompaniesContext.Provider mockInitialState={{ companiesInitial, filterText: 'Z1', companies: [] }}>
        <MyCompaniesTile />
      </useMyCompaniesContext.Provider>,
    )

    test('should render the no companies message', () => {
      expect(wrapper.find('p').text()).toContain('No companies match your search')
    })
  })
})
