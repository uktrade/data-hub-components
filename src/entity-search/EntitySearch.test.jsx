import React from 'react'
import { mount } from 'enzyme'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { act } from 'react-dom/test-utils'

import fixtures from './fixtures'
import getEntities from './data-providers/DnbCompanySearch'
import EntitySearchWithDataProvider from './EntitySearchWithDataProvider'

const mock = new MockAdapter(axios)
const API_ENDPOINT = 'http://localhost:8000/v4/dnb/company-search'
mock
  .onPost(API_ENDPOINT)
  .reply(200, fixtures.companySearch)
mock
  .onPost(`${API_ENDPOINT}?search_term=some%20other%20company`)
  .reply(200, fixtures.companySearchFilteredByCompanyName)
mock
  .onPost(`${API_ENDPOINT}?address_postcode=BN1%204SE`)
  .reply(200, fixtures.companySearchFilteredByPostcode)

const flushPromises = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

const wrapEntitySearch = ({
  previouslySelected,
  cannotFindLink = {
    url: 'http://stillcannotfind.com',
    text: 'still cannot find',
  },
  onEntityClick = () => console.log('entity clicked'),
} = {}) => {
  return mount(<EntitySearchWithDataProvider
    previouslySelected={previouslySelected}
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
    onEntityClick={onEntityClick}
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
    let wrappedEntitySearch
    let preventDefaultMock

    beforeAll(async () => {
      wrappedEntitySearch = wrapEntitySearch()
      preventDefaultMock = jest.fn()

      wrappedEntitySearch
        .find('Search')
        .simulate('click', { preventDefault: preventDefaultMock })

      await act(flushPromises)

      wrappedEntitySearch.update()
    })

    test('should prevent the default button action', () => {
      expect(preventDefaultMock.mock.calls.length).toEqual(1)
    })

    test('should render the component with entities', () => {
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
        cannotFindLink: {
          text: 'still cannot find',
          onClick: onCannotFindLinkClick,
        },
      })

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      wrappedEntitySearch
        .find('[href="#cannot-find"]')
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

  describe('when there is a previously selected "Change" link which is clicked', () => {
    let wrappedEntitySearch
    let onChangeClick
    let preventDefaultMock

    beforeAll(async () => {
      onChangeClick = jest.fn()
      preventDefaultMock = jest.fn()

      wrappedEntitySearch = wrapEntitySearch({
        previouslySelected: {
          onChangeClick,
          text: 'previously selected',
        },
      })

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      wrappedEntitySearch
        .find('[href="#previously-selected"]')
        .at(1)
        .simulate('click', { preventDefault: preventDefaultMock })
    })

    test('should render the component', async () => {
      expect(wrappedEntitySearch.debug()).toMatchSnapshot()
    })

    test('should prevent the default link action', async () => {
      expect(preventDefaultMock.mock.calls.length).toEqual(1)
    })

    test('should call the onChangeClick event', async () => {
      expect(onChangeClick.mock.calls.length).toEqual(1)
    })
  })

  describe('when the entity search results are clicked', () => {
    let wrappedEntitySearch
    let onEntityClick

    beforeEach(async () => {
      onEntityClick = jest.fn()

      wrappedEntitySearch = wrapEntitySearch({
        onEntityClick,
      })

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()
    })

    test('should render the component', async () => {
      expect(wrappedEntitySearch.debug()).toMatchSnapshot()
    })

    describe('when the first entity is clicked', () => {
      test('should not call the onEntityClick event', async () => {
        wrappedEntitySearch
          .find('StyledEntity')
          .at(0)
          .simulate('click')

        expect(onEntityClick.mock.calls.length).toEqual(0)
      })
    })

    describe('when the second entity is clicked', () => {
      test('should call the onEntityClick event', async () => {
        wrappedEntitySearch
          .find('StyledEntity')
          .at(1)
          .simulate('click')

        expect(onEntityClick.mock.calls.length).toEqual(1)
        expect(onEntityClick.mock.calls[0][0]).toEqual(fixtures.companySearch.results[1])
      })
    })
  })

  describe('when the API returns a server error', () => {
    beforeAll(() => {
      mock.onPost(API_ENDPOINT).reply(500)
    })

    test('should render the component with an error message', async () => {
      const wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      expect(wrappedEntitySearch.debug()).toMatchSnapshot()
    })
  })

  describe('when the API returns 0 results', () => {
    beforeAll(() => {
      mock.onPost(API_ENDPOINT).reply(200, fixtures.companySearchNoResults)
    })

    test('should render the component with a "no entities" message', async () => {
      const wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      expect(wrappedEntitySearch.debug()).toMatchSnapshot()
    })
  })
})
