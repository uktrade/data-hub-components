import addressSearch from '../data-providers/AddressSearch'
import {
  mockAddressVariation1,
  mockAddressVariation2,
  mockAddressVariation3,
} from '../__mocks__/address-search'

const MOCK_URL = 'https://addresses.com/postcode?api-key=abc123'

describe('AddressService', () => {
  describe('Address variation 1', () => {
    let addresses
    beforeEach(async () => {
      mockAddressVariation1(MOCK_URL)
      addresses = await addressSearch('https://addresses.com', 'abc123')('postcode')
    })

    test('should return addresses', () => {
      expect(addresses).toEqual([
        {
          postcode: 'postcode',
          county: 'six',
          townOrCity: 'five',
          address1: 'zero - one',
          address2: 'two',
          id: 'zero - one, two, five, six, postcode',
        },
      ])
    })
  })

  describe('Address variation 2', () => {
    let addresses = null
    beforeEach(async () => {
      mockAddressVariation2(MOCK_URL)
      addresses = await addressSearch('https://addresses.com', 'abc123')('postcode')
    })

    test('should return addresses', () => {
      expect(addresses).toEqual([
        {
          postcode: 'postcode',
          address1: 'zero - one',
          address2: 'two',
          id: 'zero - one, two, postcode',
        },
      ])
    })
  })

  describe('Address variation 3', () => {
    let addresses = null
    beforeEach(async () => {
      mockAddressVariation3(MOCK_URL)
      addresses = await addressSearch('https://addresses.com', 'abc123')('postcode')
    })

    test('should return addresses', () => {
      expect(addresses).toEqual([
        {
          postcode: 'postcode',
          townOrCity: 'five',
          address1: 'zero',
          address2: 'one',
          id: 'zero, one, five, postcode',
        },
      ])
    })
  })
})
