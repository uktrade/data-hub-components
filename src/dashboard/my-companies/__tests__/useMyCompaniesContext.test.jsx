import React from 'react'
import { mount } from 'enzyme'
import useMyCompaniesContext, {
  getSortedCompanies,
  reducer,
  filterCompanyName,
  getModel,
} from '../useMyCompaniesContext'
import companies from '../../__fixtures__/companies'

describe('Store', () => {
  describe('getModel()', () => {
    test('returns empty array if no element has been passed in', () => {
      expect(getModel()).toEqual([])
    })
    test('returns data attribute as a JS object if element has been passed', () => {
      const ele = document.createElement('div')
      ele.dataset.model = '{"foo":"bar"}'
      expect(getModel(ele)).toEqual({ foo: 'bar' })
    })
  })
  describe('getSortedCompanies()', () => {
    test('sort by recent', () => {
      const expected = [
        {
          company: {
            name: 'A1 BMW LTD!!!!!',
            id: 'a1138c1c-d449-4846-aa58-18fae7e1cb92',
            isArchived: false,
          },
          latestInteraction: {
            id: '79d92719-7402-45b6-b3d7-eff559d6b282',
            date: '2019-08-14',
            displayDate: '14 Aug 19',
            subject:
              'Here is a long interaction title some more text some more text some more text almost finished some more text nearly there more text finished',
          },
        },
        {
          company: {
            name: 'Zebra clothing',
            id: 'b89b1db3-7140-44ca-ad7a-9824c3c2gh74',
            isArchived: false,
          },
          latestInteraction: {
            id: '86f92719-7402-45b6-b3d7-eff559d6b678',
            displayDate: '21 Feb 2019',
            date: '2019-02-21',
            subject:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
        },
        {
          company: {
            name: 'Portable Potatoes',
            id: 'a30b1db3-7140-44ca-ad7a-9824c3c2ed56',
            isArchived: false,
          },
          latestInteraction: {
            displayDate: '-',
            date: null,
            subject: 'No interactions have been recorded',
          },
        },
      ]
      const recent = getSortedCompanies(companies, 'recent')
      expect(recent).toEqual(expected)
    })
    test('sort by least recent', () => {
      const expected = [
        {
          company: {
            name: 'Portable Potatoes',
            id: 'a30b1db3-7140-44ca-ad7a-9824c3c2ed56',
            isArchived: false,
          },
          latestInteraction: {
            displayDate: '-',
            date: null,
            subject: 'No interactions have been recorded',
          },
        },
        {
          company: {
            name: 'Zebra clothing',
            id: 'b89b1db3-7140-44ca-ad7a-9824c3c2gh74',
            isArchived: false,
          },
          latestInteraction: {
            id: '86f92719-7402-45b6-b3d7-eff559d6b678',
            displayDate: '21 Feb 2019',
            date: '2019-02-21',
            subject:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
        },
        {
          company: {
            name: 'A1 BMW LTD!!!!!',
            id: 'a1138c1c-d449-4846-aa58-18fae7e1cb92',
            isArchived: false,
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
      const leastRecent = getSortedCompanies(companies, 'least-recent')
      expect(leastRecent).toEqual(expected)
    })
    test('sort by alphabetical', () => {
      const expected = [
        {
          company: {
            name: 'A1 BMW LTD!!!!!',
            id: 'a1138c1c-d449-4846-aa58-18fae7e1cb92',
            isArchived: false,
          },
          latestInteraction: {
            id: '79d92719-7402-45b6-b3d7-eff559d6b282',
            date: '2019-08-14',
            displayDate: '14 Aug 19',
            subject:
              'Here is a long interaction title some more text some more text some more text almost finished some more text nearly there more text finished',
          },
        },
        {
          company: {
            name: 'Portable Potatoes',
            id: 'a30b1db3-7140-44ca-ad7a-9824c3c2ed56',
            isArchived: false,
          },
          latestInteraction: {
            displayDate: '-',
            date: null,
            subject: 'No interactions have been recorded',
          },
        },
        {
          company: {
            name: 'Zebra clothing',
            id: 'b89b1db3-7140-44ca-ad7a-9824c3c2gh74',
            isArchived: false,
          },
          latestInteraction: {
            id: '86f92719-7402-45b6-b3d7-eff559d6b678',
            displayDate: '21 Feb 2019',
            date: '2019-02-21',
            subject:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
        },
      ]
      const alphabetical = getSortedCompanies(companies, 'alphabetical')
      expect(alphabetical).toEqual(expected)
    })
  })
  describe('filterCompanyName()', () => {
    test('Filters list of companies by name', () => {
      const expected = [
        {
          company: {
            name: 'Portable Potatoes',
            id: 'a30b1db3-7140-44ca-ad7a-9824c3c2ed56',
            isArchived: false,
          },
          latestInteraction: {
            displayDate: '-',
            date: null,
            subject: 'No interactions have been recorded',
          },
        },
      ]
      const recent = filterCompanyName(companies, 'portable')
      expect(recent).toEqual(expected)
    })
    test('returns all companies if filter value is empty', () => {
      const recent = filterCompanyName(companies, '')
      expect(recent).toEqual(companies)
    })
  })
  describe('reducer()', () => {
    test('sortBy', () => {
      const action = { type: 'sortBy', sortType: 'recent' }
      const reduceWithSortByRecent = reducer(companies, action)
      expect(reduceWithSortByRecent.sortType).toEqual('recent')
    })
    test('filterBy', () => {
      const action = { type: 'filterBy', filterText: 'abc' }
      const reduceWithFilterByRecent = reducer(
        { companiesInitial: companies },
        action
      )
      expect(reduceWithFilterByRecent.filterText).toEqual('abc')
    })
    test('No action type so return original state', () => {
      const action = { type: '', filterText: 'abc' }
      const reduceWithNoAction = reducer(companies, action)
      expect(reduceWithNoAction).toEqual(companies)
    })
  })

  describe('useMyCompaniesContext()', () => {
    test('Provider matches snapshot', () => {
      const wrapper = mount(<useMyCompaniesContext.Provider />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
