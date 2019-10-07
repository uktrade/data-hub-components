import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-test-renderer'
import useAddressSearch from '../useAddressSearch'

const mockAddressList = [
  {
    address1: 'DESIGN102 - 102 Petty France',
    address2: ' Westminster',
    city: 'London',
    county: 'Greater London',
    postcode: 'SW1H 9AJ',
    country: '80756b9a-5d95-e211-a939-e4115bead28a',
  },
]

describe('useAddressSearch', () => {
  let hook

  describe('when useAddressSearch() is initialised', () => {
    const searchCallbackSpy = jest.fn()

    beforeAll(() => {
      hook = renderHook(() => useAddressSearch(searchCallbackSpy))
    })

    test('should set "error" as null', () => {
      expect(hook.result.current.error).toBeNull()
    })

    test('should set "addressList" as null', () => {
      expect(hook.result.current.addressList).toBeNull()
    })

    test('should set "isSubmitting" as false', () => {
      expect(hook.result.current.isSubmitting).toBeFalsy()
    })

    test('should not call the search callback', () => {
      expect(searchCallbackSpy).toHaveBeenCalledTimes(0)
    })
  })

  describe('when onAddressSearch() is called and the search is successful', () => {
    const searchCallbackSpy = jest.fn(() => Promise.resolve(mockAddressList))

    beforeAll(async () => {
      hook = renderHook(() => useAddressSearch(searchCallbackSpy))
      await act(async () => {
        await hook.result.current.onAddressSearch('SW1H 9AJ')
      })
    })

    test('should call the search callback with filters', () => {
      expect(searchCallbackSpy).toHaveBeenCalledTimes(1)
      expect(searchCallbackSpy).toHaveBeenCalledWith('SW1H 9AJ')
    })

    test('should set "error" as null', () => {
      expect(hook.result.current.error).toBeNull()
    })

    test('should set the "addressList"', () => {
      expect(hook.result.current.addressList).toEqual(mockAddressList)
    })

    test('should set "isSubmitting" as false', () => {
      expect(hook.result.current.isSubmitting).toBeFalsy()
    })
  })

  describe('when onAddressSearch() is called and the search is unsuccessful', () => {
    const searchCallbackSpy = jest.fn(() => Promise.reject(Error('Some error')))

    beforeAll(async () => {
      hook = renderHook(() => useAddressSearch(searchCallbackSpy))
      await act(async () => {
        await hook.result.current.onAddressSearch()
      })
    })

    test('should set "error"', () => {
      expect(hook.result.current.error).toEqual(
        'Error occurred while searching for an address.'
      )
    })

    test('should set the "addressList" to null', () => {
      expect(hook.result.current.addressList).toBeNull()
    })

    test('should set "isSubmitting" as false', () => {
      expect(hook.result.current.isSubmitting).toBeFalsy()
    })
  })
})
