import { renderHook, act } from '@testing-library/react-hooks'

import useForm from '../useForm'

const validate = value => (value !== 'correctValue' ? 'testError1' : null)
const testFields = [
  {
    name: 'testField1',
    label: 'testLabel1',
    initialValue: 'testInitialValue1',
    validate,
  },
  {
    name: 'testField2',
    label: 'testLabel2',
  },
]

describe('useForm', () => {
  describe('when registerField() is called', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      testFields.map(result.current.registerField)
    })

    test('should register fields', () => {
      expect(result.current.fields).toEqual({
        testField1: {
          initialValue: 'testInitialValue1',
          label: 'testLabel1',
          name: 'testField1',
          validate,
        },
        testField2: {
          label: 'testLabel2',
          name: 'testField2',
        },
      })
    })
    test('should set initial value', () => {
      expect(result.current.values).toEqual({
        testField1: 'testInitialValue1',
      })
    })
    test('should set touched', () => {
      expect(result.current.touched).toEqual({
        testField1: false,
        testField2: false,
      })
    })
  })

  describe('when deregisterField() is called', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      testFields.map(result.current.deregisterField)
    })

    test('should deregister field', () => {
      expect(result.current.fields).toEqual({})
    })
    test('should remove field value', () => {
      expect(result.current.values).toEqual({})
    })
    test('should unmark field as touched', () => {
      expect(result.current.touched).toEqual({})
    })
    test('should remove field error', () => {
      expect(result.current.errors).toEqual({})
    })
  })

  describe('when registerField() is called on already registered field', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.registerField(testFields[0])
      result.current.registerField(testFields[0])
    })

    test('should not register a duplicated field', () => {
      expect(Object.keys(result.current.fields)).toEqual(['testField1'])
    })
  })

  describe('when registerStep() is called on already registered step', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.registerStep('testStep1')
      result.current.registerStep('testStep1')
    })

    test('should not register a duplicated step', () => {
      expect(result.current.steps).toEqual(['testStep1'])
    })
  })

  describe('when setFieldValue() is called', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.setFieldValue('testField', 'testValue')
    })

    test('should set field value', () => {
      expect(result.current.values).toEqual({
        testField: 'testValue',
      })
    })
  })

  describe('when setFieldError() is called', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.setFieldError('testField', 'testError')
    })

    test('should set field error', () => {
      expect(result.current.errors).toEqual({
        testField: 'testError',
      })
    })
  })

  describe('when setFieldTouched() is called without validation', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.setFieldTouched('testField1', true, false)
    })

    test('should mark field as touched', () => {
      expect(result.current.touched).toEqual({
        testField1: true,
      })
    })
    test('should set field value', () => {
      expect(result.current.touched).toEqual({
        testField1: true,
      })
    })
    test('should not set any errors', () => {
      expect(result.current.errors).toEqual({})
    })
  })

  describe('when validateForm() is called on nonexistent field', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.validateForm(['madeUpField'])
    })

    test('should return an error', () => {
      expect(result.current.errors).toEqual({
        madeUpField: 'Field does not exists',
      })
    })
  })

  describe('when deregisterField() is called', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.registerField(testFields[0])
      result.current.deregisterField(['testField1'])
    })

    test('should return an error', () => {
      expect(result.current.fields).toEqual({})
    })

    test('should remove touched', () => {
      expect(result.current.touched).toEqual({})
    })
  })

  describe('when registerStep() is called', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.registerStep('testStep')
    })

    test('should add the step to form state', () => {
      expect(result.current.steps).toEqual(['testStep'])
    })
  })

  describe('when deregisterStep() is called', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.registerStep('testStep')
      result.current.deregisterStep('testStep')
    })

    test('should remove the step from the form state', () => {
      expect(result.current.steps).toEqual([])
    })
  })
})
