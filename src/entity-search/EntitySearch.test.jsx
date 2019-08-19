import React from 'react'
import { mount } from 'enzyme'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { act } from 'react-dom/test-utils'

import companySearch from './fixtures/company-search'
import companySearchFilteredByCompanyName from './fixtures/company-search-some-other-company'
import companySearchFilteredByPostcode from './fixtures/company-search-postcode-BN1-4SE'
import getEntities from './data-providers/DnbCompanySearch'
import EntitySearchWithDataProvider from './EntitySearchWithDataProvider'

const mock = new MockAdapter(axios)
const API_ENDPOINT = 'http://localhost:8000/v4/dnb/company-search'
mock
  .onPost(API_ENDPOINT)
  .reply(200, companySearch)
mock
  .onPost(`${API_ENDPOINT}?search_term=some%20other%20company`)
  .reply(200, companySearchFilteredByCompanyName)
mock
  .onPost(`${API_ENDPOINT}?address_postcode=BN1%204SE`)
  .reply(200, companySearchFilteredByPostcode)

const flushPromises = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

const wrapEntitySearch = (cannotFindLink = {
  url: 'http://stillcannotfind.com',
  text: 'still cannot find',
}) => {
  return mount(<EntitySearchWithDataProvider
    getEntities={getEntities(API_ENDPOINT)}
    entityFilters={[
      [
        { label: 'Company name', key: 'search_term' },
      ],
      [
        { label: 'Company postcode', key: 'address_postcode', width: 'one-half' },
      ],
    ]}
    cannotFind={{
      summary: 'cannot find summary',
      actions: [
        'action 1',
        'action 2',
      ],
      link: cannotFindLink,
    }}
  />)
}

describe('EntitySearch', () => {
  describe('when initially loading the entity search component', () => {
    test('should render the component without entities', () => {
      const wrappedEntitySearch = wrapEntitySearch()
      expect(wrappedEntitySearch.debug()).toMatchSnapshot()
    })
  })

  describe('when the "Search" button has been clicked', () => {
    test('should render the component with entities', async () => {
      const wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      expect(wrappedEntitySearch.debug()).toMatchSnapshot()
    })
  })

  describe('when the company name filter is applied', () => {
    test('should render the component with filtered entities', async () => {
      const wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch
        .find('[name="search_term"]')
        .at(1)
        .simulate('change', { target: { value: 'some other company' } })

      wrappedEntitySearch
        .find('Search')
        .simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      expect(wrappedEntitySearch.debug()).toMatchSnapshot()
    })
  })

  describe('when the company postcode filter is applied', () => {
    test('should render the component with filtered entities', async () => {
      const wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch
        .find('[name="address_postcode"]')
        .at(1)
        .simulate('change', { target: { value: 'BN1 4SE' } })

      wrappedEntitySearch
        .find('Search')
        .simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      expect(wrappedEntitySearch.debug()).toMatchSnapshot()
    })
  })

  describe('when the the cannot find link has a callback', () => {
    let wrappedEntitySearch
    let onCannotFindLinkClick
    let preventDefaultMock

    beforeAll(async () => {
      onCannotFindLinkClick = jest.fn()
      preventDefaultMock = jest.fn()

      wrappedEntitySearch = wrapEntitySearch({
        text: 'still cannot find',
        onClick: onCannotFindLinkClick,
      })

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      wrappedEntitySearch
        .find('[href="#"]')
        .at(1)
        .simulate('click', { preventDefault: preventDefaultMock })
    })

    test('should render the component', async () => {
      expect(wrappedEntitySearch.debug()).toMatchSnapshot()
    })

    test('should prevent the default link action', async () => {
      expect(preventDefaultMock.mock.calls.length).toEqual(1)
    })

    test('should call the onCannotFindLinkClick event', async () => {
      expect(onCannotFindLinkClick.mock.calls.length).toEqual(1)
    })
  })
})