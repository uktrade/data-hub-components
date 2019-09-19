import { renderHook, act } from '@testing-library/react-hooks'

import useForm from '../useForm'

const validate = value => (value !== 'correctValue' ? 'testError1' : null)
const testField1 = {
  name: 'testField1',
  label: 'testLabel1',
  initialValue: 'testInitialValue1',
  validate,
}
const testField2 = {
  name: 'testField2',
  label: 'testLabel2',
}

describe('useForm', () => {
  describe('when the hook is called', () => {
    let hook

    beforeAll(() => {
      const { result } = renderHook(() => useForm())
      hook = result.current
    })

    test('should return initial values', () => {
      expect(hook).toEqual({
        currentStep: 0,
        deregisterField: hook.deregisterField,
        deregisterStep: hook.deregisterStep,
        errors: {},
        fields: {},
        getFieldState: hook.getFieldState,
        getStepIndex: hook.getStepIndex,
        goBack: hook.goBack,
        goForward: hook.goForward,
        goToStepByName: hook.goToStepByName,
        isDirty: false,
        isFirstStep: hook.isFirstStep,
        isLastStep: hook.isLastStep,
        isSubmitted: false,
        registerField: hook.registerField,
        registerStep: hook.registerStep,
        setCurrentStep: hook.setCurrentStep,
        setFieldError: hook.setFieldError,
        setFieldTouched: hook.setFieldTouched,
        setFieldValue: hook.setFieldValue,
        setIsSubmitted: hook.setIsSubmitted,
        steps: [],
        touched: {},
        validateField: hook.validateField,
        validateForm: hook.validateForm,
        values: {},
      })
    })
  })

  describe('when getFieldState() is called', () => {
    let fieldState

    beforeAll(async () => {
      const { result } = renderHook(() => useForm())

      await act(async () => {
        result.current.registerField(testField1)

        // Wait for field to register.
        await Promise.resolve()

        fieldState = result.current.getFieldState('testField1')
      })
    })

    test('should return field state', () => {
      expect(fieldState).toEqual({
        error: null,
        touched: false,
        value: 'testInitialValue1',
      })
    })
  })

  describe('when getFieldState() is called on nonexistent field', () => {
    const { result } = renderHook(() => useForm())
    const fieldState = result.current.getFieldState('testField1')

    test('should return an object with default values', () => {
      expect(fieldState).toEqual({
        error: null,
        touched: false,
        value: '',
      })
    })
  })

  describe('when registerField() is called', () => {
    const { result } = renderHook(() => useForm())

    beforeAll(async () => {
      await act(async () => {
        result.current.registerField(testField1)
        result.current.registerField(testField2)

        // Wait for fields to register.
        await Promise.resolve()
      })
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

    beforeAll(async () => {
      await act(async () => {
        result.current.registerField(testField1)

        // Wait for field to register.
        await Promise.resolve()

        result.current.deregisterField('testField1')
      })
    })

    test('should deregister field', () => {
      expect(result.current.fields).toEqual({})
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

    beforeAll(async () => {
      await act(async () => {
        result.current.registerField(testField1)
        result.current.registerField(testField1)

        // Wait for fields to register.
        await Promise.resolve()
      })
    })

    test('should not register a duplicated field', () => {
      expect(Object.keys(result.current.fields)).toEqual(['testField1'])
    })
  })

  describe('when registerStep() is called on already registered step', () => {
    const { result } = renderHook(() => useForm())

    beforeAll(async () => {
      await act(async () => {
        result.current.registerStep('testStep1')
        result.current.registerStep('testStep1')

        // Wait for steps to register.
        await Promise.resolve()
      })
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

    test('should set "isDirty" to false', () => {
      expect(result.current.isDirty).toBeTruthy()
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

  describe('when validateForm() is called with provided fields', () => {
    const { result } = renderHook(() => useForm())

    beforeAll(async () => {
      await act(async () => {
        result.current.registerField({ name: 'testField1', validate: () => 'testError1' })
        result.current.registerField({ name: 'testField2', validate: () => 'testError2' })
        result.current.registerField({ name: 'testField3', validate: () => 'testError3' })

        // Wait for fields to register.
        await Promise.resolve()

        result.current.validateForm()
      })
    })

    test('should validate all the fields', () => {
      expect(result.current.errors).toEqual({
        testField1: 'testError1',
        testField2: 'testError2',
        testField3: 'testError3',
      })
    })
  })

  describe('when validateForm() is called on nonexistent field', () => {
    const { result } = renderHook(() => useForm())
    const callback = () => result.current.validateForm(['madeUpField'])

    test('should throw an exception', () => {
      expect(callback).toThrowError('Field madeUpField does not exist')
    })
  })

  describe('when deregisterField() is called', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.registerField(testField1)
      result.current.deregisterField(['testField1'])
    })

    test('should remove fields from the form state', () => {
      expect(result.current.fields).toEqual({})
    })

    test('should remove touched', () => {
      expect(result.current.touched).toEqual({})
    })
  })

  describe('when registerStep() is called', () => {
    const { result } = renderHook(() => useForm())

    beforeAll(async () => {
      await act(async () => {
        result.current.registerStep('testStep')

        // Wait for step to register.
        await Promise.resolve()
      })
    })

    test('should add the step to form state', () => {
      expect(result.current.steps).toEqual(['testStep'])
    })
  })

  describe('when validateField() is called with a single validator', () => {
    const { result } = renderHook(() => useForm())
    let error = null

    beforeAll(async () => {
      await act(async () => {
        result.current.registerField({
          name: 'testField1',
          validate: () => 'testError1',
        })

        // Wait for field to register.
        await Promise.resolve()

        error = result.current.validateField('testField1')
      })
    })

    test('should return an error', () => {
      expect(error).toEqual('testError1')
    })
  })

  describe('when validateField() is called with multiple validators and both fails validation', () => {
    const { result } = renderHook(() => useForm())
    let error

    beforeAll(async () => {
      await act(async () => {
        result.current.registerField({
          name: 'testField1',
          validate: [
            () => 'testError1',
            () => 'testError2',
          ],
        })

        // Wait for field to register.
        await Promise.resolve()

        error = result.current.validateField('testField1')
      })
    })

    test('should return an error only from the first validator', () => {
      expect(error).toEqual('testError1')
    })
  })

  describe('when validateField() is called with multiple validators and only one fails validation', () => {
    const { result } = renderHook(() => useForm())
    let error

    beforeAll(async () => {
      await act(async () => {
        result.current.registerField({
          name: 'testField1',
          validate: [
            () => null,
            () => 'testError2',
          ],
        })

        // Wait for field to register.
        await Promise.resolve()

        error = result.current.validateField('testField1')
      })
    })

    test('should return an error from the second validator', () => {
      expect(error).toEqual('testError2')
    })
  })

  describe('when validateField() is called with multiple validators and none fails validation', () => {
    const { result } = renderHook(() => useForm())
    let error

    beforeAll(async () => {
      await act(async () => {
        result.current.registerField({
          name: 'testField1',
          validate: [
            () => null,
            () => null,
          ],
        })

        // Wait for field to register.
        await Promise.resolve()

        error = result.current.validateField('testField1')
      })
    })

    test('should return null', () => {
      expect(error).toEqual(null)
    })
  })

  describe('when validateField() is called on a field without validation', () => {
    const { result } = renderHook(() => useForm())
    let error = null

    beforeAll(async () => {
      await act(async () => {
        result.current.registerField({
          name: 'testField1',
        })

        // Wait for field to register.
        await Promise.resolve()

        error = result.current.validateField('testField1')
      })
    })

    test('should return null', () => {
      expect(error).toBeNull()
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

  describe('when goToStepByName() is called', () => {
    const { result } = renderHook(() => useForm())

    beforeAll(async () => {
      await act(async () => {
        result.current.registerStep('testStep1')
        result.current.registerStep('testStep2')
        result.current.registerStep('testStep3')

        // Wait for steps to register.
        await Promise.resolve()

        result.current.goToStepByName('testStep3')
      })
    })

    test('should update the current step', () => {
      expect(result.current.currentStep).toEqual(2)
    })
  })

  describe('when goForward() is called without onSubmit() callback', () => {
    const { result } = renderHook(() => useForm())
    let error

    act(() => {
      try {
        result.current.goForward()
      } catch (e) {
        error = e
      }
    })

    test('should not throw an error', () => {
      expect(error).toBeUndefined()
    })
  })

  describe('when setIsSubmitted() is called', () => {
    const { result } = renderHook(() => useForm())
    let error

    act(() => {
      try {
        result.current.goForward()
      } catch (e) {
        error = e
      }
    })

    test('should not throw an error', () => {
      expect(error).toBeUndefined()
    })
  })

  describe('when setIsSubmitted() is called with a "true" value', () => {
    const { result } = renderHook(() => useForm())

    act(() => {
      result.current.setIsSubmitted(true)
    })

    test('should set "isSubmitted" to true', () => {
      expect(result.current.isSubmitted).toBeTruthy()
    })
  })
})
