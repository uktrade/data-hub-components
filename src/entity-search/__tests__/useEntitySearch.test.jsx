import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-test-renderer'
import useEntitySearch from '../useEntitySearch'

const mockEntities = [
  { id: '1', name: 'Entity one' },
  { id: '2', name: 'Entity two' },
]

describe('useEntitySearch', () => {
  let hook

  describe('when useEntitySearch() is initialised', () => {
    const searchCallbackSpy = jest.fn()

    beforeAll(() => {
      hook = renderHook(() => useEntitySearch(searchCallbackSpy))
    })

    test('should set "error" as null', () => {
      expect(hook.result.current.error).toBeNull()
    })

    test('should set "entities" as null', () => {
      expect(hook.result.current.entities).toBeNull()
    })

    test('should set "isSubmitting" as false', () => {
      expect(hook.result.current.isSubmitting).toBeFalsy()
    })

    test('should not call the search callback', () => {
      expect(searchCallbackSpy).toHaveBeenCalledTimes(0)
    })
  })

  describe('when onEntitySearch() is called and the search is successful', () => {
    const searchCallbackSpy = jest.fn(() => Promise.resolve(mockEntities))

    beforeAll(async () => {
      hook = renderHook(() => useEntitySearch(searchCallbackSpy))
      await act(async () => {
        await hook.result.current.onEntitySearch({
          test_filter: 'test filter value',
        })
      })
    })

    test('should call the search callback with filters', () => {
      expect(searchCallbackSpy).toHaveBeenCalledTimes(1)
      expect(searchCallbackSpy).toHaveBeenCalledWith({
        test_filter: 'test filter value',
      })
    })

    test('should set "error" as null', () => {
      expect(hook.result.current.error).toBeNull()
    })

    test('should set "entities"', () => {
      expect(hook.result.current.entities).toEqual(mockEntities)
    })

    test('should set "isSubmitting" as false', () => {
      expect(hook.result.current.isSubmitting).toBeFalsy()
    })
  })

  describe('when onEntitySearch() is and the search returns error', () => {
    const searchCallbackSpy = jest.fn(() => Promise.reject(Error('Some error')))

    beforeAll(async () => {
      hook = renderHook(() => useEntitySearch(searchCallbackSpy))
      await act(async () => {
        await hook.result.current.onEntitySearch()
      })
    })

    test('should set "error"', () => {
      expect(hook.result.current.error).toEqual('Error occurred while searching entities.')
    })

    test('should set "entities" as null', () => {
      expect(hook.result.current.entities).toBeNull()
    })

    test('should set "isSubmitting" as false', () => {
      expect(hook.result.current.isSubmitting).toBeFalsy()
    })
  })
})
