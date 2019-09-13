import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

import {
  addressSearch,
  badRequest,
} from '../__fixtures__'

export function setupSuccessMocks(apiEndpoint) {
  const mock = new MockAdapter(axios)
  mock
    .onGet(apiEndpoint)
    .reply(200, addressSearch)
}

export function setupBadRequest(apiEndpoint) {
  const mock = new MockAdapter(axios)
  mock
    .onGet(apiEndpoint)
    .reply(400, badRequest)
}

export function setupErrorMocks(apiEndpoint) {
  const mock = new MockAdapter(axios)
  mock
    .onGet(apiEndpoint)
    .reply(500)
}

export function mockAddressVariation1(apiEndpoint) {
  const mock = new MockAdapter(axios)
  mock
    .onGet(apiEndpoint)
    .reply(200, {
      Addresses: [
        'zero, one, two, , , five, six',
      ],
    })
}

export function mockAddressVariation2(apiEndpoint) {
  const mock = new MockAdapter(axios)
  mock
    .onGet(apiEndpoint)
    .reply(200, {
      Addresses: [
        'zero, one, two, , , , ',
      ],
    })
}

export function mockAddressVariation3(apiEndpoint) {
  const mock = new MockAdapter(axios)
  mock
    .onGet(apiEndpoint)
    .reply(200, {
      Addresses: [
        'zero, one, , , , five, ',
      ],
    })
}
