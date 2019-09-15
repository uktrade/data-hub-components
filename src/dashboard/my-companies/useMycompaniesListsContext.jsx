import { useReducer } from 'react'

import orderBy from 'lodash/orderBy'

import createUseContext from 'constate'
import ACTIONS from './constants'

const element = document.querySelector('#react-mount-my-companies')

export const getModel = (el = null) => (el ? JSON.parse(el.dataset.model) : [])

export function getSortedCompanies(companies, sortType) {
  const sort = {
    recent: orderBy(companies, [c => c.latestInteraction.date || ''], ['desc']),
    'least-recent': orderBy(companies, [c => c.latestInteraction.date || ''], ['asc']),
    alphabetical: orderBy(companies, [c => c.company.name], ['asc']),
  }
  return sort[sortType]
}

export function setCompanyList(companies, id) {
  return !id ? companies[0].companyList
    : companies.filter(list => list.id === id)
      .map(x => x.companyList).reduce((acc, it) => [...acc, ...it])
}

export const filterCompanyName = (companies, filterText) => (filterText.length
  ? companies.filter(c => c.company.name.toLowerCase().includes(filterText.toLowerCase()))
  : companies)

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_COMPANY_LIST:
      return {
        ...state,
        companies: setCompanyList(state.companies),
      }
    case ACTIONS.SORT_BY:
      return {
        ...state,
        companies: getSortedCompanies(state.companies, action.sortType),
        sortType: action.sortType,
      }
    case ACTIONS.FILTER_BY:
      return {
        ...state,
        filterText: action.filterText,
        companies: getSortedCompanies(
          filterCompanyName(state.companiesInitial, action.filterText),
          state.sortType,
        ),
      }
    default:
      return state
  }
}

const initialState = {
  companiesInitial: getModel(element),
  companies: getModel(element),
  sortType: 'recent',
  filterText: '',
}

const useMyCompaniesListsContext = createUseContext(({ mockProps = {}, mockInitialState = {} }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...mockInitialState })
  return {
    state,
    dispatch,
    ...mockProps,
  }
})

export default useMyCompaniesListsContext
