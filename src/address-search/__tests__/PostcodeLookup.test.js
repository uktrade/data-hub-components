import postcodeLookup from '../PostcodeLookup'
import {
  setupPostcodeMock200,
  setupPostcodeMock404,
} from '../__mocks__/postcode-lookup'

const POSTCODE = 'SW1H 9AJ'
const ENDPOINT = 'http://localhost:3000/api/postcode'
const ENDPOINT_WITH_POSTCODE = `http://localhost:3000/api/postcode/${POSTCODE}`

describe('useAddressSearch', () => {
  let axiosMock
  let response

  describe('when postcodeLookup() is called with a postcode', () => {
    beforeAll(async () => {
      axiosMock = setupPostcodeMock200(ENDPOINT_WITH_POSTCODE)
      response = await postcodeLookup(ENDPOINT)(POSTCODE)
    })

    afterAll(() => {
      axiosMock.restore()
    })

    test('should return 7 addresses and the address count notification', () => {
      const addressCount = '7 addresses found'
      expect(response[0].address1).toBe(addressCount)
      expect(response[0].id).toBe(addressCount)
      expect(response).toHaveLength(8)
    })
  })

  describe('when postcodeLookup() is called without a postcode', () => {
    beforeAll(async () => {
      axiosMock = setupPostcodeMock404(ENDPOINT)
      try {
        response = await postcodeLookup(ENDPOINT)('')
      } catch (evt) {
        response = evt
      }
    })

    afterAll(() => axiosMock.restore())

    test('should return a HTTP 404 error message', () => {
      const errMsg = 'Error: Request failed with status code 404'
      expect(response.toString()).toEqual(errMsg)
    })

    test('should return a HTTP 404', () => {
      expect(response.response.status).toBe(404)
    })
  })
})
