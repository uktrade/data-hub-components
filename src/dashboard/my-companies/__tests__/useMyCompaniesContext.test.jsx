import { orderBy } from 'lodash'
import React from 'react'
import { mount } from 'enzyme'
import useMyCompaniesContext, {
  reducer,
  filterCompanyName,
} from '../useMyCompaniesContext'
import companies from '../../__fixtures__/companies.json'
import { LIST_CHANGE, FILTER_CHANGE, ORDER_CHANGE } from '../constants'

const initialState = {
  lists: [
    { id: 'foo', name: 'Foo' },
    { id: 'bar', name: 'Bar' },
    { id: 'baz', name: 'Baz' },
  ],
  selectedIdx: 0,
  sortBy: 'alphabetical',
  filter: 'foobarbaz',
}

describe('Store', () => {
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
      expect(
        reducer(initialState, {
          type: LIST_CHANGE,
          idx: 1,
        })
      ).toEqual({ ...initialState, selectedIdx: 1 })
      expect(
        reducer(initialState, {
          type: LIST_CHANGE,
          idx: 2,
        })
      ).toEqual({ ...initialState, selectedIdx: 2 })
      expect(
        reducer(initialState, {
          type: LIST_CHANGE,
          idx: 0,
        })
      ).toEqual({ ...initialState, selectedIdx: 0 })
    })

    test('Order by change', () => {
      expect(
        reducer(initialState, {
          type: ORDER_CHANGE,
          sortBy: 'recent',
        })
      ).toEqual({ ...initialState, sortBy: 'recent' })
      expect(
        reducer(initialState, {
          type: ORDER_CHANGE,
          sortBy: 'least-recent',
        })
      ).toEqual({ ...initialState, sortBy: 'least-recent' })
      expect(
        reducer(initialState, {
          type: ORDER_CHANGE,
          sortBy: 'alphabetical',
        })
      ).toEqual({ ...initialState, sortBy: 'alphabetical' })
    })

    test('Filter change', () => {
      expect(
        reducer(initialState, {
          type: FILTER_CHANGE,
          filter: 'foo',
        })
      ).toEqual({ ...initialState, filter: 'foo' })
      expect(
        reducer(initialState, {
          type: FILTER_CHANGE,
          filter: 'bar',
        })
      ).toEqual({ ...initialState, filter: 'bar' })
      expect(
        reducer(initialState, {
          type: FILTER_CHANGE,
          filter: '',
        })
      ).toEqual({ ...initialState, filter: '' })
    })
  })

  describe('useMyCompaniesContext()', () => {
    test('Default state', () => {
      let actual
      const Mock = () => {
        const { state } = useMyCompaniesContext()
        actual = state
        return null
      }
      mount(
        <useMyCompaniesContext.Provider>
          <Mock />
        </useMyCompaniesContext.Provider>
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
      const Mock = () => {
        const { state } = useMyCompaniesContext()
        actual = state
        return null
      }
      mount(
        <useMyCompaniesContext.Provider {...initialState}>
          <Mock />
        </useMyCompaniesContext.Provider>
      )
      expect(actual).toEqual({
        ...initialState,
        lists: orderBy(initialState.lists, 'name'),
      })
    })
  })
})
