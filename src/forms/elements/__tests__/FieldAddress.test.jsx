import React from 'react'
import { mount } from 'enzyme'

import Form from '../Form'
import FieldAddress from '../FieldAddress'

const ENDPOINT = 'http://localhost:3000/api/postcode'

const country = {
  id: '123',
  name: 'United Kingdom',
}

describe('FieldAddress', () => {
  let wrapper

  describe('when component is mounted', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldAddress
            name="address"
            country={country}
            apiEndpoint={ENDPOINT}
          />
        </Form>,
      )
    })

    test('should display the postcode label', () => {
      expect(wrapper.find('label').first().text()).toEqual('Postcode')
    })

    test('should display the postcode search field', () => {
      const searchInput = wrapper.find('input')
      expect(searchInput.exists()).toBeTruthy()
    })

    test('should display the postcode search button', () => {
      const buttonText = wrapper.find('button span').text()
      expect(buttonText).toBe('Find UK address')
    })

    test('should not show a select element', () => {
      const select = wrapper.find('select')
      expect(select.exists()).toBeFalsy()
    })
  })

  describe('when clicking the search button without a postcode', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldAddress
            name="address"
            country={country}
            apiEndpoint={ENDPOINT}
          />
        </Form>,
      )

      wrapper.find('button').simulate('click')
    })

    test('should return an postcode is empty error', () => {
      expect(wrapper.text()).toContain('Enter postcode')
    })
  })
})
