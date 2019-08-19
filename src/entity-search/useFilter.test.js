import { act, renderHook } from '@testing-library/react-hooks'

import useFilter from './useFilter'

describe('useFilter', () => {
  describe('when setFilter() is called', () => {
    const { result } = renderHook(() => useFilter())

    act(() => {
      result.current.setFilter('name', 'value')
    })

    test('should set the filters', () => {
      expect(result.current.filters).toEqual({
        name: 'value',
      })
    })
  })
})
