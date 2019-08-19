import React from 'react'
import renderer from 'react-test-renderer'
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

function flushPromises() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

describe('EntitySearch', () => {
  describe('when initially loading the entity search component', () => {
    test('should render the component without entities', () => {
      const tree = renderer
        .create(<EntitySearchWithDataProvider
          getEntities={getEntities(API_ENDPOINT)}
          entityFilters={[
            [
              { label: 'Company name', key: 'search_term' },
            ],
          ]}
        />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the "Search" button has been clicked', () => {
    test('should render the component with entities', async () => {
      const wrapper = mount(<EntitySearchWithDataProvider
        getEntities={getEntities(API_ENDPOINT)}
        entityFilters={[
          [
            { label: 'Company name', key: 'search_term' },
          ],
        ]}
      />)

      wrapper.find('Search').simulate('click')

      await act(flushPromises)

      wrapper.update()

      expect(wrapper.debug()).toMatchSnapshot()
    })
  })

  describe('when the company name filter is applied', () => {
    test('should render the component with filtered entities', async () => {
      const wrapper = mount(<EntitySearchWithDataProvider
        getEntities={getEntities(API_ENDPOINT)}
        entityFilters={[
          [
            { label: 'Company name', key: 'search_term' },
          ],
        ]}
      />)

      wrapper
        .find('[name="search_term"]')
        .at(1)
        .simulate('change', { target: { value: 'some other company' } })

      wrapper
        .find('Search')
        .simulate('click')

      await act(flushPromises)

      wrapper.update()

      expect(wrapper.debug()).toMatchSnapshot()
    })
  })

  describe('when the company postcode filter is applied', () => {
    test('should render the component with filtered entities', async () => {
      const wrapper = mount(<EntitySearchWithDataProvider
        getEntities={getEntities(API_ENDPOINT)}
        entityFilters={[
          [
            { label: 'Company name', key: 'search_term' },
          ],
          [
            { label: 'Company postcode', key: 'address_postcode', width: 'one-half' },
          ],
        ]}
      />)

      wrapper
        .find('[name="address_postcode"]')
        .at(1)
        .simulate('change', { target: { value: 'BN1 4SE' } })

      wrapper
        .find('Search')
        .simulate('click')

      await act(flushPromises)

      wrapper.update()

      expect(wrapper.debug()).toMatchSnapshot()
    })
  })
})
