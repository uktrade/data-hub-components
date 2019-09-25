import React from 'react'
import { mount } from 'enzyme'

import AddressSearch from '../AddressSearch'

const POSTCODE = 'SW1H 9AJ'

const addressList = [{
  address1: 'D S D Ltd - 102 Petty France',
  postcode: 'SW1H9AJ',
}, {
  address1: 'DESIGN102 - 102 Petty France',
  postcode: 'SW1H9AJ',
},
]

describe('Address search', () => {
  let wrapper

  describe('component initial state', () => {
    beforeAll(() => {
      wrapper = mount(
        <AddressSearch
          addressList={[]}
          onAddressSearch={jest.fn()}
          onAddressSelect={jest.fn()}
        />,
      )
    })

    test('should display the postcode label', () => {
      expect(wrapper.find('label').text()).toEqual('Postcode')
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
    let onAddressSearchSpy
    beforeAll(() => {
      onAddressSearchSpy = jest.fn()
      wrapper = mount(
        <AddressSearch
          addressList={[]}
          onAddressSearch={onAddressSearchSpy}
          onAddressSelect={jest.fn()}
        />,
      )

      wrapper
        .find('button')
        .simulate('click')
    })

    test('should call the "onAddressSearch" callback once', () => {
      expect(onAddressSearchSpy.mock.calls.length).toBe(1)
    })

    test('should call the "onAddressSearch" callback with "unknown"', () => {
      expect(onAddressSearchSpy.mock.calls[0][0]).toBe('unknown')
    })
  })

  describe('when clicking the search button with a postcode', () => {
    let onAddressSearchSpy
    beforeAll(() => {
      onAddressSearchSpy = jest.fn()
      wrapper = mount(
        <AddressSearch
          addressList={[]}
          onAddressSearch={onAddressSearchSpy}
          onAddressSelect={jest.fn()}
        />,
      )

      wrapper
        .find('input')
        .first()
        .simulate('change', {
          target: {
            value: POSTCODE,
          },
        })

      wrapper
        .find('button')
        .simulate('click')
    })

    test('should call the "onAddressSearch" callback once', () => {
      expect(onAddressSearchSpy.mock.calls.length).toBe(1)
    })

    test('should call the "onAddressSearch" callback with the "SW1H 9AJ"', () => {
      expect(onAddressSearchSpy.mock.calls[0][0]).toBe(POSTCODE)
    })
  })

  describe('when there are addresses', () => {
    beforeAll(() => {
      wrapper = mount(
        <AddressSearch
          addressList={addressList}
          onAddressSearch={jest.fn()}
          onAddressSelect={jest.fn()}
        />,
      )
    })

    test('should show a select element', () => {
      const select = wrapper.find('select')
      expect(select.exists()).toBeTruthy()
    })

    test('should contain 2 addresses', () => {
      expect(wrapper.find('select option').length).toBe(2)
    })
  })

  describe('when changing address within the select', () => {
    let onAddressSelectSpy
    beforeAll(() => {
      onAddressSelectSpy = jest.fn()
      wrapper = mount(
        <AddressSearch
          addressList={addressList}
          onAddressSearch={jest.fn()}
          onAddressSelect={onAddressSelectSpy}
        />,
      )

      wrapper
        .find('select')
        .simulate('change', {
          target: {
            selectedIndex: 1,
          },
        })
    })

    test('should call the "onAddressSelect" callback once', () => {
      expect(onAddressSelectSpy.mock.calls.length).toBe(1)
    })

    test('should call the "onAddressSelect" callback with the correct address', () => {
      expect(onAddressSelectSpy.mock.calls[0][0]).toBe(addressList[1])
    })
  })

  describe('when the user encounters an error', () => {
    beforeAll(() => {
      wrapper = mount(
        <AddressSearch
          error="Error!"
          addressList={[]}
          onAddressSearch={jest.fn()}
          onAddressSelect={jest.fn()}
        />,
      )
    })

    test('should display an error', () => {
      expect(wrapper.find('p').last().text()).toBe('Error!')
    })
  })
})
