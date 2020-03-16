import React from 'react'
import { mount } from 'enzyme'
import LoadingBox from '@govuk-react/loading-box'
import { act } from 'react-dom/test-utils'
import FormStateful from '../FormStateful'
import FieldInput from '../FieldInput'

describe('FormStateful', () => {
  let wrapper

  describe('when a form has many fields', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldInput type="text" name="foo" />
          <FieldInput type="text" name="bar" />
          <FieldInput type="text" name="baz" />
          <FieldInput type="text" name="raz" />
          <FieldInput type="text" name="taz" />
          <FieldInput type="text" name="naz" />
          <FieldInput type="text" name="laz" />
          <FieldInput type="text" name="ahh" />
          <FieldInput type="text" name="baa" />
          <FieldInput type="text" name="zaa" />
          <FieldInput type="text" name="taa" />
          <FieldInput type="text" name="faa" />
          <FieldInput type="text" name="laa" />
          <FieldInput type="text" name="bru" />
        </FormStateful>
      )
    })

    test('should render all 14 fields without issue', () => {
      expect(wrapper.find(FieldInput).length).toEqual(14)
    })
  })

  describe('when children are passed as a function', () => {
    let formState

    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          {(state) => {
            formState = state
          }}
        </FormStateful>
      )
    })

    test('should pass form state as the argument', () => {
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

  describe('when a completed form is submitted', () => {
    const onSubmitSpy = jest.fn()

    beforeAll(async () => {
      wrapper = mount(
        <FormStateful onSubmit={onSubmitSpy}>
          <FieldInput name="testField" type="text" />
        </FormStateful>
      )

      await act(async () => {
        const input = wrapper.find(FieldInput)
        input.simulate('change', { target: { value: 'hello' } })
        wrapper.simulate('submit')
      })
    })

    test('should call onSubmit function', () => {
      expect(onSubmitSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('when an incomplete form is submitted', () => {
    const onSubmitSpy = jest.fn()

    beforeAll(async () => {
      wrapper = mount(
        <FormStateful>
          {(state) => (
            <>
              <div className="form-state">{JSON.stringify(state)}</div>
              <FieldInput
                type="text"
                name="testField1"
                validate={() => 'testError1'}
              />
              <FieldInput
                type="text"
                name="testField2"
                validate={() => 'testError2'}
              />
              <button
                type="submit"
                className="submit"
                onClick={state.validateForm}
              >
                Submit
              </button>
            </>
          )}
        </FormStateful>
      )

      await act(async () => {
        const submit = wrapper.find('.submit')
        submit.simulate('click')
      })
    })

    test('should validate each field', () => {
      const formState = JSON.parse(wrapper.find('.form-state').text())
      expect(formState.errors).toEqual({
        testField1: 'testError1',
        testField2: 'testError2',
      })
      expect(formState.touched).toEqual({
        testField1: true,
        testField2: true,
      })
    })

    test('should not call onSubmit function', () => {
      expect(onSubmitSpy).toHaveBeenCalledTimes(0)
    })
  })

  describe('when form is in loading state', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          {({ isLoading, setIsLoading }) => {
            if (!isLoading) {
              setIsLoading(true)
            }
          }}
        </FormStateful>
      )
    })

    test('should display the loading indicator', () => {
      const loader = wrapper.find(LoadingBox)
      expect(loader.prop('loading')).toBe(true)
    })
  })
})
