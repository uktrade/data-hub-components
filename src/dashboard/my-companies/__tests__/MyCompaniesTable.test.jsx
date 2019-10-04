import React from 'react'
import { mount } from 'enzyme'
import MyCompaniesTable from '../MyCompaniesTable'
import MyCompaniesFilters from '../MyCompaniesFilters'
import useMyCompaniesContext from '../useMyCompaniesContext'
import { changeAndUpdate, changeSelectAndUpdate } from '../../../utils/enzyme'

const getTableRowTexts = wrapper => (
  wrapper.find('tbody tr').map(row => row.text())
)

const fixture = companies => (
  mount(
    <useMyCompaniesContext.Provider lists={[
      {
        name: 'Lonely list',
        companies,
      },
    ]}
    >
      <MyCompaniesTable />
    </useMyCompaniesContext.Provider>,
  )
)

const companies = [
  {
    company: {
      name: 'Company A foo',
      id: 'a',
    },
    latestInteraction: {
      id: 'a',
      date: '2019-01-06',
      subject: 'Interaction A',
    },
  },
  {
    company: {
      name: 'Company B fooo',
      id: 'b',
    },
    latestInteraction: {
      id: 'a',
      date: '2019-01-04',
      subject: 'Interaction B',
    },
  },
  {
    company: {
      name: 'Company C foooo',
      id: 'c',
    },
    latestInteraction: {
      id: 'c',
      date: '2019-01-05',
      subject: 'Interaction C',
    },
  },
]

const fixtureMulti = () => fixture(companies)

describe('MyCompaniesTable', () => {
  describe('Single company', () => {
    const wrapper = fixture(companies.slice(0, 1))

    test('Should display a single row', () => {
      expect(getTableRowTexts(wrapper)).toEqual([
        'Company A foo6 Jan 2019Interaction A',
      ])
    })

    test('Should not display filters', () => {
      expect(wrapper.find(MyCompaniesFilters)).toHaveLength(0)
      expect(wrapper.text()).toBe(
        'Company nameLast interaction Company A foo6 Jan 2019Interaction A',
      )
    })
  })

  describe('Multiple companies', () => {
    describe('Order by', () => {
      const wrapper = fixtureMulti()
      test('Should display filters', () => {
        expect(wrapper.find(MyCompaniesFilters)).toHaveLength(1)
      })

      test('Should order by recent interaction by default', () => {
        expect(getTableRowTexts(wrapper)).toEqual([
          'Company A foo6 Jan 2019Interaction A',
          'Company C foooo5 Jan 2019Interaction C',
          'Company B fooo4 Jan 2019Interaction B',
        ])
      })

      test('Should reorder on selecting the least recent order', () => {
        changeSelectAndUpdate(wrapper, 'Least recent interaction')
        expect(getTableRowTexts(wrapper))
          .toEqual([
            'Company B fooo4 Jan 2019Interaction B',
            'Company C foooo5 Jan 2019Interaction C',
            'Company A foo6 Jan 2019Interaction A',
          ])
      })

      test('Should reorder on selecting alphabetical sort option', () => {
        changeSelectAndUpdate(wrapper, 'Company name A-Z')
        expect(getTableRowTexts(wrapper))
          .toEqual([
            'Company A foo6 Jan 2019Interaction A',
            'Company B fooo4 Jan 2019Interaction B',
            'Company C foooo5 Jan 2019Interaction C',
          ])
      })
    })

    describe('Filter', () => {
      const wrapper = fixtureMulti()

      test('Should not apply any filters by default', () => {
        expect(getTableRowTexts(wrapper)).toEqual([
          'Company A foo6 Jan 2019Interaction A',
          'Company C foooo5 Jan 2019Interaction C',
          'Company B fooo4 Jan 2019Interaction B',
        ])
      })

      test('Should apply filters on filter input change', () => {
        changeAndUpdate(wrapper.find('input'), 'foo')
        expect(getTableRowTexts(wrapper)).toEqual([
          'Company A foo6 Jan 2019Interaction A',
          'Company C foooo5 Jan 2019Interaction C',
          'Company B fooo4 Jan 2019Interaction B',
        ])
      })
    })
  })
})
