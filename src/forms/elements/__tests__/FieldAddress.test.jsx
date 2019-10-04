import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import ErrorText from '@govuk-react/error-text'

import StatusMessage from '../../../status-message/StatusMessage'
import FieldUneditable from '../FieldUneditable'
import FieldAddress from '../FieldAddress'
import FieldInput from '../FieldInput'
import Form from '../Form'

import {
  setupPostcodeMock200,
  setupPostcodeMock400,
} from '../../../address-search/__mocks__/postcode-lookup'

const POSTCODE = 'SW1H 9AJ'
const ENDPOINT = 'http://localhost:3000/api/postcode'
const ENDPOINT_WITH_POSTCODE = `http://localhost:3000/api/postcode/${POSTCODE}`

const country = {
  id: '123',
  name: 'United Kingdom',
}

const flushPromises = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

describe('FieldAddress', () => {
  let wrapper

  describe('when the component is mounted and the country is UK', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldAddress
            name="address"
            country={country}
            apiEndpoint={ENDPOINT}
          />
        </Form>
      )
    })

    test('should display the postcode search button', () => {
      const buttonText = wrapper.find('button span').text()
      expect(buttonText).toBe('Find UK address')
    })

    test('should not show a select element', () => {
      const select = wrapper.find('select')
      expect(select.exists()).toBe(false)
    })

    test('should show the "Postcode" field', () => {
      const inputs = wrapper.find(FieldInput)
      expect(inputs.at(0).props().type).toBe('search')
      expect(inputs.at(0).props().name).toBe('postcode')
      expect(inputs.at(0).props().label).toBe('Postcode')
      expect(inputs.at(0).props().required).toBe('Enter postcode')
      expect(inputs.at(0).props().maxLength).toBe(10)
    })

    test('should show the "Address line 1" field', () => {
      const inputs = wrapper.find(FieldInput)
      expect(inputs.at(1).props().type).toBe('text')
      expect(inputs.at(1).props().name).toBe('address1')
      expect(inputs.at(1).props().label).toBe('Address line 1')
      expect(inputs.at(1).props().required).toBe('Enter address line 1')
    })

    test('should show the "Address line 2" field', () => {
      const inputs = wrapper.find(FieldInput)
      expect(inputs.at(2).props().type).toBe('text')
      expect(inputs.at(2).props().name).toBe('address2')
      expect(inputs.at(2).props().label).toBe('Address line 2 (optional)')
      expect(inputs.at(2).props().required).toBeNull()
    })

    test('should show the "Town or city" field', () => {
      const inputs = wrapper.find(FieldInput)
      expect(inputs.at(3).props().type).toBe('text')
      expect(inputs.at(3).props().name).toBe('city')
      expect(inputs.at(3).props().label).toBe('Town or city')
      expect(inputs.at(3).props().required).toBe('Enter town or city')
    })

    test('should show the "County" field', () => {
      const inputs = wrapper.find(FieldInput)
      expect(inputs.at(4).props().type).toBe('text')
      expect(inputs.at(4).props().name).toBe('county')
      expect(inputs.at(4).props().label).toBe('County (optional)')
      expect(inputs.at(4).props().required).toBeNull()
    })

    test('should show both "Country" labels', () => {
      const countryLabels = wrapper.find(FieldUneditable).text()
      expect(countryLabels).toContain('Country')
      expect(countryLabels).toContain('United Kingdom')
    })
  })

  describe('when clicking the "Find UK address" button without a postcode', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldAddress
            name="address"
            country={country}
            apiEndpoint={ENDPOINT}
          />
        </Form>
      )

      wrapper.find('button').simulate('click')
    })

    test('should return an error "Enter postcode"', () => {
      const errMsg = wrapper.find(ErrorText).text()
      expect(errMsg).toBe('Enter postcode')
    })
  })

  describe(`when clicking the "Find UK address" button with the postcode ${POSTCODE}`, () => {
    let axiosMock
    let listItems
    beforeAll(async () => {
      axiosMock = setupPostcodeMock200(ENDPOINT_WITH_POSTCODE)
      wrapper = mount(
        <Form>
          <FieldAddress
            name="address"
            country={country}
            apiEndpoint={ENDPOINT}
          />
        </Form>
      )

      afterAll(() => axiosMock.restore())

      wrapper
        .find('input')
        .first()
        .simulate('change', {
          target: {
            value: POSTCODE,
          },
        })

      wrapper.find('button').simulate('click')

      await act(flushPromises)

      wrapper.update()

      listItems = wrapper.find('select option')
    })

    test('should show a select with 8 items', () => {
      expect(listItems.length).toBe(8)
    })

    test('should display the address count', () => {
      const addressCount = listItems.at(0).text()
      expect(addressCount).toBe('7 addresses found')
    })
  })

  describe('when selecting an address', () => {
    let axiosMock
    beforeAll(async () => {
      axiosMock = setupPostcodeMock200(ENDPOINT_WITH_POSTCODE)
      wrapper = mount(
        <Form>
          <FieldAddress
            name="address"
            country={country}
            apiEndpoint={ENDPOINT}
          />
        </Form>
      )

      afterAll(() => axiosMock.restore())

      wrapper
        .find('input')
        .first()
        .simulate('change', {
          target: {
            value: POSTCODE,
          },
        })

      wrapper.find('button').simulate('click')

      await act(flushPromises)

      wrapper.update()

      wrapper.find('select').simulate('change', {
        target: {
          selectedIndex: 1,
        },
      })
    })

    test('should populate all address fields', () => {
      const address = wrapper.find('input')
      expect(address.at(0).props().value).toBe('SW1H 9AJ')
      expect(address.at(1).props().value).toBe('D S D Ltd -  102 Petty France')
      expect(address.at(2).props().value).toBe('Westminster')
      expect(address.at(3).props().value).toBe('London')
      expect(address.at(4).props().value).toBe('Greater London')
    })
  })

  describe('when the component is mounted and the country is not UK', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldAddress
            name="address"
            country={{
              id: '123',
              name: 'Japan',
            }}
            apiEndpoint={ENDPOINT}
          />
        </Form>
      )
    })

    test('should not contain the postcode search button', () => {
      const button = wrapper.find('button')
      expect(button.exists()).toBe(false)
    })

    test('should show an optional postcode field', () => {
      const inputs = wrapper.find(FieldInput)
      expect(inputs.at(0).props().type).toBe('text')
      expect(inputs.at(0).props().name).toBe('postcode')
      expect(inputs.at(0).props().label).toBe('Postcode (optional)')
    })

    test('should show both country labels', () => {
      const countryLabels = wrapper.find(FieldUneditable).text()
      expect(countryLabels).toContain('Country')
      expect(countryLabels).toContain('Japan')
    })
  })

  describe('when the component errors', () => {
    let axiosMock
    let statusMsg
    beforeAll(async () => {
      axiosMock = setupPostcodeMock400(ENDPOINT_WITH_POSTCODE)
      wrapper = mount(
        <Form>
          <FieldAddress
            name="address"
            country={country}
            apiEndpoint={ENDPOINT}
          />
        </Form>
      )

      afterAll(() => axiosMock.restore())

      wrapper
        .find('input')
        .first()
        .simulate('change', {
          target: {
            value: 'RUB B1SH',
          },
        })

      wrapper.find('button').simulate('click')

      await act(flushPromises)

      wrapper.update()

      statusMsg = wrapper.find(StatusMessage)
    })

    test('should show a status message', () => {
      expect(statusMsg.exists()).toBe(true)
    })

    test('should display an error', () => {
      const errMsg = statusMsg.text()
      expect(errMsg).toBe(
        'Error occurred while searching for an address. Enter the address manually.'
      )
    })
  })
})
