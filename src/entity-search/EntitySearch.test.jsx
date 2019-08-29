import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { setupSuccessMocks, setupErrorMocks, setupNoResultsMocks } from './__mocks__/company-search'
import fixtures from './__fixtures__'
import getEntities from './data-providers/DnbCompanySearch'
import EntitySearchWithDataProvider from './EntitySearchWithDataProvider'

const API_ENDPOINT = 'http://localhost:8000/v4/dnb/company-search'

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
        { label: 'Company postcode', key: 'postal_code', width: 'one-half', optional: true },
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
    let wrappedEntitySearch

    beforeAll(() => {
      setupSuccessMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch()
    })

    test('should render the component without entities', () => {
      expect(wrappedEntitySearch).toMatchSnapshot()
    })
  })

  describe('when the "Search" button has been clicked', () => {
    let wrappedEntitySearch
    let preventDefaultMock

    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

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
      expect(wrappedEntitySearch).toMatchSnapshot()
    })
  })

  describe('when the company name filter is applied', () => {
    let wrappedEntitySearch

    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch
        .find('[name="search_term"]')
        .at(1)
        .simulate('change', { target: { value: 'some other company' } })

      wrappedEntitySearch
        .find('Search')
        .simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()
    })

    test('should render the component with filtered entities', () => {
      expect(wrappedEntitySearch).toMatchSnapshot()
    })
  })

  describe('when the company postcode filter is applied', () => {
    let wrappedEntitySearch

    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch
        .find('[name="postal_code"]')
        .at(1)
        .simulate('change', { target: { value: 'BN1 4SE' } })

      wrappedEntitySearch
        .find('Search')
        .simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()
    })

    test('should render the component with filtered entities', () => {
      expect(wrappedEntitySearch).toMatchSnapshot()
    })
  })

  describe('when the the cannot find link has a callback', () => {
    let wrappedEntitySearch
    let onCannotFindLinkClick
    let preventDefaultMock

    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

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

    test('should render the component', () => {
      expect(wrappedEntitySearch).toMatchSnapshot()
    })

    test('should prevent the default link action', () => {
      expect(preventDefaultMock.mock.calls.length).toEqual(1)
    })

    test('should call the onCannotFindLinkClick event', () => {
      expect(onCannotFindLinkClick.mock.calls.length).toEqual(1)
    })
  })

  describe('when there is a previously selected "Change" link which is clicked', () => {
    let wrappedEntitySearch
    let onChangeClick
    let preventDefaultMock

    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

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

    test('should render the component', () => {
      expect(wrappedEntitySearch).toMatchSnapshot()
    })

    test('should prevent the default link action', () => {
      expect(preventDefaultMock.mock.calls.length).toEqual(1)
    })

    test('should call the onChangeClick event', () => {
      expect(onChangeClick.mock.calls.length).toEqual(1)
    })
  })

  describe('when the entity search results are clicked', () => {
    let wrappedEntitySearch
    let onEntityClick

    beforeEach(async () => {
      setupSuccessMocks(API_ENDPOINT)

      onEntityClick = jest.fn()

      wrappedEntitySearch = wrapEntitySearch({
        onEntityClick,
      })

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()
    })

    test('should render the component', () => {
      expect(wrappedEntitySearch).toMatchSnapshot()
    })

    describe('when the first entity is clicked', () => {
      test('should not call the onEntityClick event', () => {
        wrappedEntitySearch
          .find('StyledEntity')
          .at(0)
          .simulate('click')

        expect(onEntityClick.mock.calls.length).toEqual(0)
      })
    })

    describe('when the second entity is clicked', () => {
      test('should call the onEntityClick event', () => {
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
    let wrappedEntitySearch

    beforeAll(async () => {
      setupErrorMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()
    })

    test('should render the component with an error message', () => {
      expect(wrappedEntitySearch).toMatchSnapshot()
    })
  })

  describe('when the API returns 0 results', () => {
    let wrappedEntitySearch

    beforeAll(async () => {
      setupNoResultsMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()
    })

    test('should render the component with a "no entities" message', () => {
      expect(wrappedEntitySearch).toMatchSnapshot()
    })
  })

  describe('when at first there are results and then on second click there is an error', () => {
    let wrappedEntitySearch

    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch
        .find('Search')
        .simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      setupErrorMocks(API_ENDPOINT)

      wrappedEntitySearch
        .find('Search')
        .simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()
    })

    test('should render the component with the error and without results', () => {
      expect(wrappedEntitySearch.debug()).toMatchSnapshot()
    })
  })
})
