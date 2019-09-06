import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { setupSuccessMocks, setupErrorMocks, setupNoResultsMocks } from '../__mocks__/company-search'
import fixtures from '../__fixtures__'
import getEntities from '../data-providers/DnbCompanySearch'
import CannotFindDetails from '../CannotFindDetails'
import EntityList from '../EntityList'
import EntityListItem from '../EntityListItem'
import EntitySearchWithDataProvider from '../EntitySearchWithDataProvider'

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
  onEntityClick = () => {},
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
  describe('when loading the entity search component', () => {
    let wrappedEntitySearch

    beforeAll(() => {
      setupSuccessMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch()
    })

    test('should show the filters', () => {
      expect(wrappedEntitySearch.find('label').at(0).text()).toEqual('Company name')
      expect(wrappedEntitySearch.find('[name="search_term"]').exists()).toBeTruthy()
      expect(wrappedEntitySearch.find('label').at(1).text()).toEqual('Company postcode (optional)')
      expect(wrappedEntitySearch.find('[name="postal_code"]').exists()).toBeTruthy()
    })

    test('should show the "Search" button', () => {
      expect(wrappedEntitySearch.find('Search').exists()).toBeTruthy()
    })

    test('should not show the entities', () => {
      expect(wrappedEntitySearch.find(EntityList).exists()).toBeFalsy()
    })

    test('should not show the cannot find details', () => {
      expect(wrappedEntitySearch.find(CannotFindDetails).exists()).toBeFalsy()
    })

    describe('when the "Search" button is click', () => {
      const preventDefaultSpy = jest.fn()

      beforeAll(async () => {
        wrappedEntitySearch
          .find('Search')
          .simulate('click', { preventDefault: preventDefaultSpy })

        await act(flushPromises)

        wrappedEntitySearch.update()
      })

      test('should prevent the default button action', () => {
        expect(preventDefaultSpy.mock.calls.length).toEqual(1)
      })

      test('should show the entities', () => {
        const entityList = wrappedEntitySearch.find(EntityList)
        expect(entityList.find('li').length).toEqual(2)
      })

      test('should show the cannot find details', () => {
        const actionList = wrappedEntitySearch.find(CannotFindDetails)
        expect(actionList.find('li').length).toEqual(2)
      })
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
      const entityList = wrappedEntitySearch.find(EntityList)
      const results = entityList.find('li')
      expect(results.length).toEqual(1)
      expect(results.find('h3').text()).toEqual('Some other company')
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
      const entityList = wrappedEntitySearch.find(EntityList)
      const results = entityList.find('li')
      expect(results.length).toEqual(1)
      expect(results.find('h3').text()).toEqual('Some company name')
    })
  })

  describe('when the the cannot find link has a callback', () => {
    let wrappedEntitySearch
    const onCannotFindLinkSpy = jest.fn()
    const preventDefaultSpy = jest.fn()

    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch({
        cannotFindLink: {
          text: 'still cannot find',
          onClick: onCannotFindLinkSpy,
        },
      })

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      wrappedEntitySearch
        .find('[href="#cannot-find"]')
        .at(1)
        .simulate('click', { preventDefault: preventDefaultSpy })
    })

    test('should prevent the default link action', () => {
      expect(preventDefaultSpy.mock.calls.length).toEqual(1)
    })

    test('should call the onCannotFindLinkClick event', () => {
      expect(onCannotFindLinkSpy.mock.calls.length).toEqual(1)
    })
  })


  describe('when there is a previously selected "Change" link which is clicked', () => {
    let wrappedEntitySearch
    const onChangeClickSpy = jest.fn()
    const preventDefaultSpy = jest.fn()

    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch({
        previouslySelected: {
          onChangeClick: onChangeClickSpy,
          text: 'previously selected',
        },
      })

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      wrappedEntitySearch
        .find('[href="#previously-selected"]')
        .at(1)
        .simulate('click', { preventDefault: preventDefaultSpy })
    })

    test('should prevent the default link action', () => {
      expect(preventDefaultSpy.mock.calls.length).toEqual(1)
    })

    test('should call the onChangeClick event', () => {
      expect(onChangeClickSpy.mock.calls.length).toEqual(1)
    })
  })

  describe('when the entity search results are clicked', () => {
    let wrappedEntitySearch
    const onEntityClick = jest.fn()

    beforeEach(async () => {
      setupSuccessMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch({
        onEntityClick,
      })

      wrappedEntitySearch.find('Search').simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()
    })

    describe('when the first entity is clicked', () => {
      test('should not call the onEntityClick event', () => {
        wrappedEntitySearch
          .find(EntityListItem)
          .at(0)
          .simulate('click')

        expect(onEntityClick.mock.calls.length).toEqual(0)
      })
    })

    describe('when the second entity is clicked', () => {
      test('should call the onEntityClick event', () => {
        wrappedEntitySearch
          .find(EntityListItem)
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

    test('should not show the entities', () => {
      expect(wrappedEntitySearch.find(EntityList).exists()).toBeFalsy()
    })

    test('should not show the cannot find details', () => {
      expect(wrappedEntitySearch.find(CannotFindDetails).exists()).toBeFalsy()
    })

    test('should show an error', () => {
      const expected = 'Error occurred while searching entities.'
      expect(wrappedEntitySearch.find('p').text()).toEqual(expected)
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

    test('should not show the entities', () => {
      expect(wrappedEntitySearch.find(EntityList).exists()).toBeFalsy()
    })

    test('should not show the cannot find details', () => {
      expect(wrappedEntitySearch.find(CannotFindDetails).exists()).toBeFalsy()
    })

    test('should show an error', () => {
      const expected = 'There are no entities to show.'
      expect(wrappedEntitySearch.find('p').text()).toEqual(expected)
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

    test('should not show the entities', () => {
      expect(wrappedEntitySearch.find(EntityList).exists()).toBeFalsy()
    })

    test('should not show the cannot find details', () => {
      expect(wrappedEntitySearch.find(CannotFindDetails).exists()).toBeFalsy()
    })

    test('should show an error', () => {
      const expected = 'Error occurred while searching entities.'
      expect(wrappedEntitySearch.find('p').text()).toEqual(expected)
    })
  })

  describe('when at first there is an error and then on second click there are results', () => {
    let wrappedEntitySearch

    beforeAll(async () => {
      setupErrorMocks(API_ENDPOINT)

      wrappedEntitySearch = wrapEntitySearch()

      wrappedEntitySearch
        .find('Search')
        .simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()

      setupSuccessMocks(API_ENDPOINT)

      wrappedEntitySearch
        .find('Search')
        .simulate('click')

      await act(flushPromises)

      wrappedEntitySearch.update()
    })

    test('should show the entities', () => {
      const entityList = wrappedEntitySearch.find(EntityList)
      expect(entityList.find('li').length).toEqual(2)
    })

    test('should show the cannot find details', () => {
      const actionList = wrappedEntitySearch.find(CannotFindDetails)
      expect(actionList.find('li').length).toEqual(2)
    })

    test('should not show an error', () => {
      const actual = wrappedEntitySearch.find('p').text()
      expect(actual).not.toEqual('Error occurred while searching entities.')
      expect(actual).not.toEqual('There are no entities to show.')
    })
  })
})
