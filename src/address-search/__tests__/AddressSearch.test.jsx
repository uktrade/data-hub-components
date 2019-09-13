import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { setupSuccessMocks, setupErrorMocks, setupBadRequest } from '../__mocks__/address-search'
import addressSearch from '../data-providers/AddressSearch'
import AddressSearchWithDataProvider from '../AddressSearchWithDataProvider'

const BASE_URL = 'https://api.getAddress.io/v2/uk'
const API_KEY = 'abc123'

const GOOD_POSTCODE = 'BN1 4SE'
const BAD_POSTCODE = 'BN1'

const GOOD_POSTCODE_URL = `${BASE_URL}/${GOOD_POSTCODE}?api-key=${API_KEY}`
const BAD_POSTCODE_URL = `${BASE_URL}/${BAD_POSTCODE}?api-key=${API_KEY}`
const UNKNOWN_POSTCODE_URL = `${BASE_URL}/unknown?api-key=${API_KEY}`

const flushPromises = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

const getWrapper = () => {
  return mount(
    <AddressSearchWithDataProvider
      getAddress={addressSearch(BASE_URL, API_KEY)}
    />,
  )
}

describe('AddressSearch', () => {
  describe('when the component initially loads', () => {
    let wrapper

    beforeAll(() => {
      setupSuccessMocks(GOOD_POSTCODE_URL)
      wrapper = getWrapper()
    })

    test('should render the component', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when the "Find UK address" button is clicked with a postcode', () => {
    let wrapper
    let preventDefaultMock

    beforeAll(async () => {
      setupSuccessMocks(GOOD_POSTCODE_URL)

      wrapper = getWrapper()
      preventDefaultMock = jest.fn()

      wrapper
        .find('[name="postcode"]')
        .first()
        .simulate('change', {
          target: {
            value: GOOD_POSTCODE,
          },
        })

      wrapper
        .find('button')
        .simulate('click', { preventDefault: preventDefaultMock })

      await act(flushPromises)

      wrapper.update()
    })

    test('should prevent the default button action', () => {
      expect(preventDefaultMock.mock.calls.length).toEqual(1)
    })

    test('should render a select with the label "Select an address"', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when the "Find UK address" button is clicked without a postcode', () => {
    let wrapper

    beforeAll(async () => {
      setupSuccessMocks(UNKNOWN_POSTCODE_URL)

      wrapper = getWrapper()

      wrapper
        .find('button')
        .simulate('click')

      await act(flushPromises)

      wrapper.update()
    })

    test('should render the component with an error message "Enter a valid postcode"', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when the address is not found - HTTP 400', () => {
    let wrapper

    beforeAll(async () => {
      setupBadRequest(BAD_POSTCODE_URL)

      wrapper = getWrapper()

      wrapper
        .find('[name="postcode"]')
        .first()
        .simulate('change', {
          target: {
            value: BAD_POSTCODE,
          },
        })

      wrapper
        .find('button')
        .simulate('click')

      await act(flushPromises)

      wrapper.update()
    })

    test('should display an error message: "Enter a valid postcode"', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when there is a server error - HTTP 500', () => {
    let wrapper

    beforeAll(async () => {
      setupErrorMocks(GOOD_POSTCODE_URL)

      wrapper = getWrapper()

      wrapper
        .find('[name="postcode"]')
        .first()
        .simulate('change', {
          target: {
            value: GOOD_POSTCODE,
          },
        })

      wrapper
        .find('button')
        .simulate('click')

      await act(flushPromises)

      wrapper.update()
    })

    test('should display an error meessage: "An error occurred while searching for an address"', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
