import { renderHook, act } from '@testing-library/react-hooks'

import useForm from '../useForm'

const validate = (value) => (value !== 'correctValue' ? 'testError1' : null)
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
  let formState

  describe('when the hook is called', () => {
    beforeAll(() => {
      const hook = renderHook(() => useForm())
      formState = hook.result.current
    })

    test('should return default properties', () => {
      expect(formState).toEqual({
        currentStep: 0,
        deregisterField: formState.deregisterField,
        deregisterStep: formState.deregisterStep,
        errors: {},
        fields: {},
        getFieldState: formState.getFieldState,
        getStepIndex: formState.getStepIndex,
        goBack: formState.goBack,
        goForward: formState.goForward,
        goToStepByName: formState.goToStepByName,
        isDirty: false,
        isFirstStep: formState.isFirstStep,
        isLastStep: formState.isLastStep,
        isLoading: false,
        isSubmitted: false,
        registerField: formState.registerField,
        registerStep: formState.registerStep,
        setCurrentStep: formState.setCurrentStep,
        setFieldError: formState.setFieldError,
        setFieldTouched: formState.setFieldTouched,
        setFieldValue: formState.setFieldValue,
        setIsLoading: formState.setIsLoading,
        setIsSubmitted: formState.setIsSubmitted,
        steps: [],
        submissionError: null,
        touched: {},
        validateField: formState.validateField,
        validateForm: formState.validateForm,
        values: {},
      })
    })
  })

  describe('when the hook is called with "initialValues"', () => {
    beforeAll(() => {
      const hook = renderHook(() =>
        useForm({
          initialValues: { hey: 'how are you?' },
        })
      )
      formState = hook.result.current
    })

    test('should return "values" equal to "initialValues"', () => {
      expect(formState.values).toEqual({ hey: 'how are you?' })
    })

    test('should return false "isDirty"', () => {
      expect(formState.isDirty).toEqual(false)
    })

    test('should return empty "touched"', () => {
      expect(formState.touched).toEqual({})
    })

    test('should return empty "errors"', () => {
      expect(formState.errors).toEqual({})
    })
  })

  describe('when getFieldState() is called', () => {
    let fieldState

    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField(testField1)
        fieldState = hook.result.current.getFieldState('testField1')
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
    let fieldState

    beforeAll(() => {
      const hook = renderHook(() => useForm())

      act(() => {
        fieldState = hook.result.current.getFieldState('testField1')
      })
    })

    test('should return an object with default values', () => {
      expect(fieldState).toEqual({
        error: null,
        touched: false,
        value: '',
      })
    })
  })

  describe('when registerField() is called', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField(testField1)
        await hook.result.current.registerField(testField2)
        formState = hook.result.current
      })
    })

    test('should register fields', () => {
      expect(formState.fields).toEqual({
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
      expect(formState.values).toEqual({
        testField1: 'testInitialValue1',
      })
    })

    test('should set touched', () => {
      expect(formState.touched).toEqual({
        testField1: false,
        testField2: false,
      })
    })
  })

  describe('when deregisterField() is called', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField(testField1)
        await hook.result.current.deregisterField('testField1')
        formState = hook.result.current
      })
    })

    test('should deregister field', () => {
      expect(formState.fields).toEqual({})
    })

    test('should unmark field as touched', () => {
      expect(formState.touched).toEqual({})
    })

    test('should remove field error', () => {
      expect(formState.errors).toEqual({})
    })
  })

  describe('when registerField() is called on already registered field', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField(testField1)
        await hook.result.current.registerField(testField1)
        formState = hook.result.current
      })
    })

    test('should not register a duplicated field', () => {
      expect(Object.keys(formState.fields)).toEqual(['testField1'])
    })
  })

  describe('when registerStep() is called on already registered step', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerStep('testStep1')
        await hook.result.current.registerStep('testStep1')
        formState = hook.result.current
      })
    })

    test('should not register a duplicated step', () => {
      expect(formState.steps).toEqual(['testStep1'])
    })
  })

  describe('when setFieldValue() is called with a non-empty value', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.setFieldValue('testField', 'testValue')
        formState = hook.result.current
      })
    })

    test('should set the field value', () => {
      expect(formState.values).toEqual({ testField: 'testValue' })
    })

    test('should set "isDirty" to true', () => {
      expect(formState.isDirty).toBeTruthy()
    })
  })

  describe('when setFieldValue() is called with an empty value', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.setFieldValue('testField', '')
        formState = hook.result.current
      })
    })

    test('should unset the field value', () => {
      expect(formState.values).toEqual({})
    })

    test('should set "isDirty" to false', () => {
      expect(formState.isDirty).toBeFalsy()
    })
  })

  describe('when setFieldError() is called', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        window.scrollTo = jest.fn()
        await hook.result.current.setFieldError('testField', 'testError')
        formState = hook.result.current
      })
    })

    test('should set field error', () => {
      expect(formState.errors).toEqual({ testField: 'testError' })
    })

    test('should scroll to the top of the page', () => {
      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
  })

  describe('when setFieldTouched() is called', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        window.scrollTo = jest.fn()
        await hook.result.current.setFieldTouched('testField1', true)
        formState = hook.result.current
      })
    })

    test('should mark field as touched', () => {
      expect(formState.touched).toEqual({ testField1: true })
    })

    test('should set field value', () => {
      expect(formState.touched).toEqual({ testField1: true })
    })

    test('should not set any errors', () => {
      expect(formState.errors).toEqual({})
    })
  })

  describe('when validateForm() is called with provided fields', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField({
          name: 'testField1',
          validate: () => 'testError1',
        })
        await hook.result.current.registerField({
          name: 'testField2',
          validate: () => 'testError2',
        })
        await hook.result.current.registerField({
          name: 'testField3',
          validate: () => 'testError3',
        })

        window.scrollTo = jest.fn()

        hook.result.current.validateForm()

        formState = hook.result.current
      })
    })

    test('should validate all the fields and set errors', () => {
      expect(formState.errors).toEqual({
        testField1: 'testError1',
        testField2: 'testError2',
        testField3: 'testError3',
      })
    })

    test('should scroll to the top of the page', () => {
      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
  })

  describe('when validateForm() is called on nonexistent field', () => {
    let callback

    beforeAll(async () => {
      const hook = renderHook(() => useForm())
      callback = () => hook.result.current.validateForm(['madeUpField'])
    })

    test('should throw an exception', () => {
      expect(callback).toThrow('Field madeUpField does not exist')
    })
  })

  describe('when registerStep() is called', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerStep('testStep')

        formState = hook.result.current
      })
    })

    test('should add the step to form state', () => {
      expect(formState.steps).toEqual(['testStep'])
    })
  })

  describe('when validateField() is called with a single validator', () => {
    let validationError

    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField({
          name: 'testField1',
          validate: () => 'testError1',
        })

        validationError = await hook.result.current.validateField('testField1')
      })
    })

    test('should return an error', () => {
      expect(validationError).toEqual('testError1')
    })
  })

  describe('when validateField() is called with multiple validators and both fails validation', () => {
    let validationError

    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField({
          name: 'testField1',
          validate: [() => 'testError1', () => 'testError2'],
        })

        validationError = await hook.result.current.validateField('testField1')
      })
    })

    test('should return an error only from the first validator', () => {
      expect(validationError).toEqual('testError1')
    })
  })

  describe('when validateField() is called with multiple validators and only one fails validation', () => {
    let validationError

    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField({
          name: 'testField1',
          validate: [() => null, () => 'testError2'],
        })

        validationError = await hook.result.current.validateField('testField1')
      })
    })

    test('should return an error from the second validator', () => {
      expect(validationError).toEqual('testError2')
    })
  })

  describe('when validateField() is called with multiple validators and none fails validation', () => {
    let validationError

    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField({
          name: 'testField1',
          validate: [() => null, () => null],
        })

        validationError = await hook.result.current.validateField('testField1')
      })
    })

    test('should return null (no error)', () => {
      expect(validationError).toEqual(null)
    })
  })

  describe('when validateField() is called with validator that requires the form state', () => {
    function validatorUsingFormState(value, name, formSt) {
      formState = formSt
    }

    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField({
          name: 'testField1',
          validate: validatorUsingFormState,
        })

        await hook.result.current.validateField('testField1')
      })
    })

    test('should have access to the form state', () => {
      expect(formState).toEqual({
        currentStep: 0,
        errors: {},
        fields: {
          testField1: {
            name: 'testField1',
            validate: validatorUsingFormState,
          },
        },
        isDirty: false,
        isLoading: false,
        isSubmitted: false,
        steps: [],
        submissionError: null,
        touched: {
          testField1: false,
        },
        values: {},
      })
    })
  })

  describe('when validateField() is called on a field without validation', () => {
    let validationError

    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerField({
          name: 'testField1',
        })

        validationError = await hook.result.current.validateField('testField1')
      })
    })

    test('should return null', () => {
      expect(validationError).toBeNull()
    })
  })

  describe('when deregisterStep() is called', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerStep('testStep')
        await hook.result.current.deregisterStep('testStep')
        formState = hook.result.current
      })
    })

    test('should remove the step from the form state', () => {
      expect(formState.steps).toEqual([])
    })
  })

  describe('when setCurrentStep() is called', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerStep('testStep1')
        await hook.result.current.registerStep('testStep2')

        window.scrollTo = jest.fn()

        hook.result.current.setCurrentStep(1)

        formState = hook.result.current
      })
    })

    test('should update the current step', () => {
      expect(formState.currentStep).toEqual(1)
    })

    test('should scroll to the top of the page', () => {
      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
  })

  describe('when goToStepByName() is called', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerStep('testStep1')
        await hook.result.current.registerStep('testStep2')
        await hook.result.current.registerStep('testStep3')

        window.scrollTo = jest.fn()

        hook.result.current.goToStepByName('testStep3')

        formState = hook.result.current
      })
    })

    test('should update the current step', () => {
      expect(formState.currentStep).toEqual(2)
    })

    test('should scroll to the top of the page', () => {
      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
  })

  describe('when goForward() is called', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.registerStep('testStep1')
        await hook.result.current.registerStep('testStep2')

        window.scrollTo = jest.fn()

        hook.result.current.goForward()

        formState = hook.result.current
      })
    })

    test('should go to the next step', () => {
      expect(formState.currentStep).toEqual(1)
    })

    test('should scroll to the top of the page', () => {
      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
  })

  describe('when goForward() is called but "scrollToTop" is set to false', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm({ scrollToTop: false }))

      await act(async () => {
        window.scrollTo = jest.fn()
        hook.result.current.goForward()
      })
    })

    test('should not scroll to the top of the page', () => {
      expect(window.scrollTo).not.toHaveBeenCalled()
    })
  })

  describe('when goBack() is called', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm({ initialStep: 1 }))

      await act(async () => {
        await hook.result.current.registerStep('testStep1')
        await hook.result.current.registerStep('testStep2')

        window.scrollTo = jest.fn()

        hook.result.current.goBack()

        formState = hook.result.current
      })
    })

    test('should go to the previous step', () => {
      expect(formState.currentStep).toEqual(0)
    })

    test('should scroll to the top of the page', () => {
      expect(window.scrollTo).toHaveBeenCalledTimes(1)
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
  })

  describe('when setIsSubmitted() is called with a "true" value', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm({ initialStep: 1 }))

      await act(async () => {
        await hook.result.current.setIsSubmitted(true)
        formState = hook.result.current
      })
    })

    test('should set "isSubmitted" to true', () => {
      expect(formState.isSubmitted).toBeTruthy()
    })
  })

  describe('when setIsLoading() is called with a "true" value', () => {
    beforeAll(async () => {
      const hook = renderHook(() => useForm())

      await act(async () => {
        await hook.result.current.setIsLoading(true)
        formState = hook.result.current
      })
    })

    test('should set "isSubmitted" to true', () => {
      expect(formState.isLoading).toBeTruthy()
    })
  })

  describe('when form was submitted but exception was thrown', () => {
    const error = new Error('testException')

    beforeAll(async () => {
      const onSubmit = () => {
        throw error
      }

      const hook = renderHook(() => useForm({ onSubmit }))

      await act(async () => {
        await hook.result.current.goForward()
        formState = hook.result.current
      })
    })

    test('should set "submissionError"', () => {
      expect(formState.submissionError).toEqual(error)
    })

    test('should set "isLoading" to false', () => {
      expect(formState.isLoading).toBeFalsy()
    })

    test('should NOT set "isSubmitted" to true', () => {
      expect(formState.isSubmitted).toBeFalsy()
    })
  })

  describe('when form was submitted and redirection URL was set', () => {
    beforeAll(async () => {
      window.location.assign = jest.fn()

      const onSubmit = () => 'http://example.com'

      const hook = renderHook(() => useForm({ onSubmit }))

      await act(async () => {
        await hook.result.current.goForward()
        formState = hook.result.current
      })
    })

    test('should redirect the page', () => {
      expect(window.location.assign).toHaveBeenCalledTimes(1)
      expect(window.location.assign).toHaveBeenCalledWith('http://example.com')
    })

    test('should keep isLoading with truthy value', () => {
      expect(formState.isLoading).toBeTruthy()
    })

    test('should keep isSubmitted with falsy value', () => {
      expect(formState.isSubmitted).toBeFalsy()
    })
  })

  describe('when form was submitted successfully', () => {
    const onSubmit = jest.fn()

    beforeAll(async () => {
      const hook = renderHook(() => useForm({ onSubmit }))

      await act(async () => {
        await hook.result.current.goForward()
        formState = hook.result.current
      })
    })

    test('should set "isLoading" to false', () => {
      expect(formState.isLoading).toBeFalsy()
    })

    test('should set "isSubmitted" to true', () => {
      expect(formState.isSubmitted).toBeTruthy()
    })
  })
})
