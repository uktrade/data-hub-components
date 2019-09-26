import React from 'react'
import { mount } from 'enzyme'

import Form from '../Form'
import Step from '../Step'
import useField from '../../hooks/useField'

const TestField = (props) => {
  const { name, value, onChange, onBlur } = useField(props)
  return (
    <input name={name} value={value} onChange={onChange} onBlur={onBlur} />
  )
}

describe('Step', () => {
  let formState
  let wrapper

  describe('when there is a form with only one step', () => {
    const onSubmitSpy = jest.fn()

    beforeAll(() => {
      wrapper = mount(
        <Form onSubmit={onSubmitSpy}>
          {form => (
            <>
              <div className="form-state">{JSON.stringify(form)}</div>
              <Step name="testStep1">
                <TestField type="text" name="testField1" id="testField1" />
              </Step>
            </>
          )}
        </Form>,
      )
      formState = JSON.parse(wrapper.find('.form-state').text())
    })

    afterEach(() => onSubmitSpy.mockReset())

    test('should render only a "Submit" button', () => {
      expect(wrapper.find('button').text()).toEqual('Submit')
    })
    test('should save the current step to form state', () => {
      expect(formState.currentStep).toEqual(0)
    })
    test('should register the step', () => {
      expect(formState.steps).toEqual(['testStep1'])
    })
    test('should render child fields', () => {
      expect(wrapper.find('#testField1').exists()).toBeTruthy()
    })
    test('should register fields within the step', () => {
      expect(Object.keys(formState.fields)).toEqual(['testField1'])
    })

    describe('when the form is filled and the "Submit" button is clicked', () => {
      beforeAll(() => {
        const testField1 = wrapper.find('#testField1')
        testField1.simulate('change', { target: { value: 'testValue' } })
        const submitButton = wrapper.find('button')
        submitButton.simulate('submit')
      })

      test('should call onSubmit() with form values', () => {
        expect(onSubmitSpy).toHaveBeenCalledTimes(1)
        expect(onSubmitSpy).toHaveBeenCalledWith({
          testField1: 'testValue',
        })
      })
    })
  })

  describe('when there is a form with two steps but one is hidden', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          {form => (
            <>
              <div className="form-state">{JSON.stringify(form)}</div>
              <Step name="testStepMounted">
                <TestField type="text" name="testField1" id="testField1" />
              </Step>
              {form.values.testField1 === 'mount' && (
                <Step name="testStepWillMount">
                  <TestField type="text" name="testField2" id="testField2" />
                </Step>
              )}
            </>
          )}
        </Form>,
      )
      formState = JSON.parse(wrapper.find('.form-state').text())
    })

    test('should render only a "Submit" button', () => {
      expect(wrapper.find('button').text()).toEqual('Submit')
    })
    test('should save the current step to form state', () => {
      expect(formState.currentStep).toEqual(0)
    })
    test('should register the step', () => {
      expect(formState.steps).toEqual(['testStepMounted'])
    })
    test('should render child fields', () => {
      expect(wrapper.find('#testField1').exists()).toBeTruthy()
    })
    test('should register fields within the step', () => {
      expect(Object.keys(formState.fields)).toEqual(['testField1'])
    })

    describe('when the hidden step is mounted', () => {
      beforeAll(() => {
        const testField1 = wrapper.find('#testField1')
        testField1.simulate('change', { target: { value: 'mount' } })
        formState = JSON.parse(wrapper.find('.form-state').text())
      })

      test('should render only a "Continue" button', () => {
        expect(wrapper.find('button').text()).toEqual('Continue')
      })
      test('should not change the current step', () => {
        expect(formState.currentStep).toEqual(0)
      })
      test('should register the step', () => {
        expect(formState.steps).toEqual(['testStepMounted', 'testStepWillMount'])
      })
    })
  })

  describe('when there is a form with many steps', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          {form => (
            <>
              <div className="form-state">{JSON.stringify(form)}</div>
              <Step name="testStep1">
                <TestField
                  type="text"
                  name="testField1"
                  id="testField1"
                  validate={value => (!value ? 'testField1 is required' : null)}
                />
              </Step>
              <Step name="testStep2">
                <TestField type="text" name="testField2" id="testField2" />
              </Step>
              <Step name="testStep3">
                <TestField type="text" name="testField3" id="testField3" />
              </Step>
              <Step name="testStep4">
                <TestField type="text" name="testField4" id="testField4" />
              </Step>
            </>
          )}
        </Form>,
      )
      formState = JSON.parse(wrapper.find('.form-state').text())
    })

    test('should render only a "Continue" button', () => {
      expect(wrapper.find('button').text()).toEqual('Continue')
    })
    test('should save the current step to form state', () => {
      expect(formState.currentStep).toEqual(0)
    })
    test('should render child fields from the first step', () => {
      expect(wrapper.find('#testField1').exists()).toBeTruthy()
    })
    test('should register fields from the first step', () => {
      expect(Object.keys(formState.fields)).toEqual(['testField1'])
    })
    test('should register all steps', () => {
      expect(formState.steps).toEqual([
        'testStep1',
        'testStep2',
        'testStep3',
        'testStep4',
      ])
    })

    describe('when the required field is not filled and the "Continue" button is clicked', () => {
      beforeAll(() => {
        wrapper.find('button').simulate('submit')
        formState = JSON.parse(wrapper.find('.form-state').text())
      })

      test('should stay on the same step', () => {
        expect(formState.currentStep).toEqual(0)
      })
      test('should store errors in the form state', () => {
        expect(formState.errors).toEqual({
          testField1: 'testField1 is required',
        })
      })
      test('should mark all fields as touched and store this info in the form state', () => {
        expect(formState.touched).toEqual({
          testField1: true,
        })
      })
      test('should render child fields from the first step', () => {
        expect(wrapper.find('#testField2').exists()).toBeFalsy()
      })
      test('should register fields from the first step', () => {
        expect(Object.keys(formState.fields)).toEqual(['testField1'])
      })
    })

    describe('when the required field is filled and the "Continue" button is clicked', () => {
      beforeAll(() => {
        wrapper.find('#testField1').simulate('change', { target: { value: 'hello' } })
        wrapper.find('button').simulate('submit')
        formState = JSON.parse(wrapper.find('.form-state').text())
      })

      test('should change the current step and save it to form state', () => {
        expect(formState.currentStep).toEqual(1)
      })
      test('should render a "Continue" button', () => {
        expect(wrapper.find('button[name="forward"]').text()).toEqual('Continue')
      })
      test('should render a "Back" button', () => {
        expect(wrapper.find('button[name="back"]').text()).toEqual('Back')
      })
      test('should render child fields from the second step', () => {
        expect(wrapper.find('#testField2').exists()).toBeTruthy()
      })
      test('should not render child fields from the first step', () => {
        expect(wrapper.find('#testField1').exists()).toBeFalsy()
      })
      test('should register fields from the second step', () => {
        expect(Object.keys(formState.fields)).toEqual(['testField2'])
      })

      describe('when the "Back" button is clicked', () => {
        beforeAll(() => {
          const prevButton = wrapper.find('button[name="back"]')
          prevButton.simulate('click')
          formState = JSON.parse(wrapper.find('.form-state').text())
        })

        test('should change the current step and save it to form state', () => {
          expect(formState.currentStep).toEqual(0)
        })
        test('should render only the "Continue" button', () => {
          expect(wrapper.find('button').text()).toEqual('Continue')
        })
        test('should render child fields from the first step', () => {
          expect(wrapper.find('#testField1').exists()).toBeTruthy()
        })
        test('should not render child fields from the second step', () => {
          expect(wrapper.find('#testField2').exists()).toBeFalsy()
        })
        test('should register fields from the first step', () => {
          expect(Object.keys(formState.fields)).toEqual(['testField1'])
        })
      })
    })
  })

  describe('when the "forwardButton" prop is passed as a string', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <Step name="testStep1" forwardButton="testForwardButtonText" />
          <Step name="testStep2" />
        </Form>,
      )
    })

    test('should render a forward button with a custom text', () => {
      expect(wrapper.find('button[name="forward"]').text()).toEqual('testForwardButtonText')
    })
  })

  describe('when the "backButton" prop is passed as a string', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form initialStep={1}>
          <Step name="testStep1" />
          <Step name="testStep2" backButton="testBackButtonText" />
        </Form>,
      )
    })

    test('should render a back button with a custom text', () => {
      expect(wrapper.find('button[name="back"]').text()).toEqual('testBackButtonText')
    })
  })

  describe('when the "forwardButton" prop is passed as "null"', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <Step name="testStep1" forwardButton={null} />
          <Step name="testStep2" />
        </Form>,
      )
    })

    test('should hide the forward button', () => {
      expect(wrapper.find('button[name="forward"]').exists()).toBeFalsy()
    })
  })

  describe('when the "backButton" prop is passed as "null"', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form initialStep={1}>
          <Step name="testStep1" />
          <Step name="testStep2" backButton={null} />
        </Form>,
      )
    })

    test('should hide the back button', () => {
      expect(wrapper.find('button[name="back"]').exists()).toBeFalsy()
    })
  })

  describe('when a component is passed to the "forwardButton" prop', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <Step name="testStep1" forwardButton={<a href="/">Go to form A</a>} />
          <Step name="testStep2" />
        </Form>,
      )
    })

    test('should render the component', () => {
      const link = wrapper.find('a')
      expect(link.text()).toEqual('Go to form A')
    })
  })

  describe('when a component is passed to the "backButton" prop', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form initialStep={1}>
          <Step name="testStep1" />
          <Step name="testStep2" backButton={<a href="/">Back to homepage</a>} />
        </Form>,
      )
    })

    test('should render the component', () => {
      const link = wrapper.find('a')
      expect(link.text()).toEqual('Back to homepage')
    })
  })

  describe('when there is a next step and the "forwardButton" prop was not specified', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <Step name="testStep1" />
          <Step name="testStep2" />
        </Form>,
      )
    })

    test('should render the "Continue" button', () => {
      expect(wrapper.find('button[name="forward"]').text()).toEqual('Continue')
    })
  })

  describe('when there is a previous step and the "backButton" prop was not specified', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form initialStep={1}>
          <Step name="testStep1" />
          <Step name="testStep2" />
        </Form>,
      )
    })

    test('should render the "Back" button', () => {
      expect(wrapper.find('button[name="back"]').text()).toEqual('Back')
    })
  })
})
