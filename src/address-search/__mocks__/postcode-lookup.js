import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

import addressSearch from '../__fixtures__/address-search-SW1H 9AJ'

export function setupSuccessMocks(apiEndpoint, adapterOptions = {}) {
  const mock = new MockAdapter(axios, adapterOptions)
  mock
    .onGet(apiEndpoint)
    .reply(200, addressSearch)

  mock
    .onAny(apiEndpoint)
    .reply(200, addressSearch)
}

export function setupErrorMocks(apiEndpoint, adapterOptions = {}) {
  const mock = new MockAdapter(axios, adapterOptions)
  mock.onGet(apiEndpoint).reply(500)
}
