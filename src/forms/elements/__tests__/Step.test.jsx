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

  describe('when there is a form with one step', () => {
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

    describe('when the step is mounted', () => {
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
    })

    describe('when the form is filled and "Submit" button is clicked', () => {
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

    describe('when the form is mounted', () => {
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

    describe('when the form is mounted', () => {
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
        test('should store which field were touched in the form state', () => {
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
            const prevButton = wrapper.find('button').at(1)
            prevButton.simulate('click')
            formState = JSON.parse(wrapper.find('.form-state').text())
          })

          test('should change the current step and save it to form state', () => {
            expect(formState.currentStep).toEqual(0)
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
  })

  describe('when the testForwardButtonText prop is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <Step name="testStep1" forwardButtonText="testForwardButtonText" />
          <Step name="testStep2" />
        </Form>,
      )
    })

    test('should render a back button with modified step', () => {
      expect(wrapper.find('button').text()).toEqual('testForwardButtonText')
    })
  })

  describe('when the backButtonText prop is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form initialStep={1}>
          <Step name="testStep1" />
          <Step name="testStep2" backButtonText="testBackButtonText" />
        </Form>,
      )
    })

    test('should render a back button with modified step', () => {
      expect(wrapper.find('button').at(1).text()).toEqual('testBackButtonText')
    })
  })

  describe('when the hideForwardButton prop is set to true', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <Step name="testStep1" hideForwardButton={true} />
          <Step name="testStep2" />
        </Form>,
      )
    })

    test('should hide the forward button', () => {
      expect(wrapper.find('button').exists()).toBeFalsy()
    })
  })

  describe('when the hideBackButton prop is set to true', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form initialStep={1}>
          <Step name="testStep1" />
          <Step name="testStep2" hideBackButton={true} />
        </Form>,
      )
    })

    test('should hide the back button', () => {
      expect(wrapper.find('button').text().includes('Back')).toBeFalsy()
    })
  })
})
