import _ from 'lodash'
import React from 'react'
import { mount } from 'enzyme'
import useMyCompaniesContext, {
  getSortedCompanies,
  reducer,
  filterCompanyName,
} from '../useMyCompaniesContext'
import companies from '../../__fixtures__/companies'
import { LIST_CHANGE, FILTER_CHANGE, ORDER_CHANGE } from '../constants'

const initialState = {
  lists: [
    { name: 'Foo' },
    { name: 'Bar' },
    { name: 'Baz' },
  ],
  selectedIdx: 0,
  sortBy: 'alphabetical',
  filter: 'foobarbaz',
}

describe('Store', () => {
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
    test('List change', () => {
      expect(reducer(initialState, {
        type: LIST_CHANGE,
        idx: 1,
      })).toEqual({ ...initialState, selectedIdx: 1 })

      expect(reducer(initialState, {
        type: LIST_CHANGE,
        idx: 2,
      })).toEqual({ ...initialState, selectedIdx: 2 })

      expect(reducer(initialState, {
        type: LIST_CHANGE,
        idx: 0,
      })).toEqual({ ...initialState, selectedIdx: 0 })
    })

    test('Order by change', () => {
      expect(reducer(initialState, {
        type: ORDER_CHANGE,
        sortBy: 'recent',
      })).toEqual({ ...initialState, sortBy: 'recent' })

      expect(reducer(initialState, {
        type: ORDER_CHANGE,
        sortBy: 'least-recent',
      })).toEqual({ ...initialState, sortBy: 'least-recent' })

      expect(reducer(initialState, {
        type: ORDER_CHANGE,
        sortBy: 'alphabetical',
      })).toEqual({ ...initialState, sortBy: 'alphabetical' })
    })

    test('Filter change', () => {
      expect(reducer(initialState, {
        type: FILTER_CHANGE,
        filter: 'foo',
      })).toEqual({ ...initialState, filter: 'foo' })

      expect(reducer(initialState, {
        type: FILTER_CHANGE,
        filter: 'bar',
      })).toEqual({ ...initialState, filter: 'bar' })

      expect(reducer(initialState, {
        type: FILTER_CHANGE,
        filter: '',
      })).toEqual({ ...initialState, filter: '' })
    })
  })

  describe('useMyCompaniesContext()', () => {
    test('Default state', () => {
      let actual

      const SomeComponent = () => {
        const { state } = useMyCompaniesContext()
        actual = state
        return null
      }

      mount(
        <useMyCompaniesContext.Provider>
          <SomeComponent />
        </useMyCompaniesContext.Provider>,
      )

      expect(actual).toEqual({
        lists: [],
        filter: '',
        sortBy: 'recent',
        selectedIdx: 0,
      })
    })

    test('Provided state', () => {
      let actual

      const SomeComponent = () => {
        const { state } = useMyCompaniesContext()
        actual = state
        return null
      }

      mount(
        <useMyCompaniesContext.Provider {...initialState}>
          <SomeComponent />
        </useMyCompaniesContext.Provider>,
      )

      expect(actual).toEqual({
        ...initialState,
        lists: _.orderBy(initialState.lists, 'name'),
      })
    })
  })
})
