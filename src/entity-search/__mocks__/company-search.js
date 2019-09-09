import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

import fixtures from '../__fixtures__'

const mock = new MockAdapter(axios)

export function setupSuccessMocks(apiEndpoint) {
  mock
    .onPost(apiEndpoint, {})
    .reply(200, fixtures.companySearch)
  mock
    .onPost(apiEndpoint, { search_term: 'some other company' })
    .reply(200, fixtures.companySearchFilteredByCompanyName)
  mock
    .onPost(apiEndpoint, { postal_code: 'BN1 4SE' })
    .reply(200, fixtures.companySearchFilteredByPostcode)
}

export function setupErrorMocks(apiEndpoint) {
  mock.onPost(apiEndpoint, {}).reply(500)
  mock.onPost(apiEndpoint, { search_term: 'some other company' }).reply(500)
  mock.onPost(apiEndpoint, { postal_code: 'BN1 4SE' }).reply(500)
}

export function setupNoResultsMocks(apiEndpoint) {
  mock
    .onPost(apiEndpoint, {})
    .reply(200, fixtures.companySearchNoResults)
  mock
    .onPost(apiEndpoint, { search_term: 'some other company' })
    .reply(200, fixtures.companySearchNoResults)
  mock
    .onPost(apiEndpoint, { postal_code: 'BN1 4SE' })
    .reply(200, fixtures.companySearchNoResults)
}
