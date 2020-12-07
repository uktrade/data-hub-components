import React from 'react'
import { mount } from 'enzyme'
import HintText from '@govuk-react/hint-text'
import Label from '@govuk-react/label'
import ErrorText from '@govuk-react/error-text'
import { act } from 'react-dom/test-utils'

import FormStateful from '../FormStateful'
import FieldTypeahead from '../FieldTypeahead'
import FieldWrapper from '../FieldWrapper'
import Typeahead from '../../../typeahead/Typeahead'
import useFormContext from '../../hooks/useFormContext'

describe('FieldTypeahead', () => {
  describe('when the field is mounted', () => {
    test('should set default attributes on the typeahead element', () => {
      const wrapper = mount(
        <FormStateful
          initialValues={{ testField: { label: 'someValueLabel' } }}
        >
          <FieldTypeahead name="testField" />
        </FormStateful>
      )
      const typeahead = wrapper.find(Typeahead)
      expect(typeahead.prop('inputId')).toEqual('testField')
      expect(typeahead.prop('value')).toEqual({
        label: 'someValueLabel',
      })
      expect(typeahead.prop('onBlur')).toBeInstanceOf(Function)
      expect(typeahead.prop('onChange')).toBeInstanceOf(Function)
    })
  })

  describe('when the field does specify a label', () => {
    test('should render the typeahead and a label', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTypeahead name="testField" label="testLabel" />
        </FormStateful>
      )
      expect(wrapper.find(Label).exists()).toBe(true)
      expect(wrapper.find(Typeahead).prop('aria-label')).toEqual('testLabel')
    })
  })

  describe('when the field does not specify a label', () => {
    test('should render the field without a label', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTypeahead name="testField" />
        </FormStateful>
      )
      expect(wrapper.find(Label).exists()).toBe(false)
      expect(wrapper.find(Typeahead).prop('aria-label')).toEqual(null)
    })
  })

  describe('when the field does specify a legend', () => {
    test('should render the field with a legend', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTypeahead name="testField" legend="testLegend" />
        </FormStateful>
      )
      expect(wrapper.find('legend').text()).toEqual('testLegend')
      expect(wrapper.find(Typeahead).prop('aria-label')).toEqual('testLegend')
    })
  })

  describe('when the field does specify a hint', () => {
    test('should render the field with a legend', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTypeahead name="testField" hint="testHint" />
        </FormStateful>
      )
      expect(wrapper.find(HintText).text()).toEqual('testHint')
    })
  })

  describe('when the validation fails', () => {
    test('should render error message', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTypeahead name="testField" validate={() => 'testError'} />
        </FormStateful>
      )
      wrapper.find('form').simulate('submit')

      expect(wrapper.find(ErrorText).text()).toEqual('testError')

      const inputWrapper = wrapper
        .find(FieldWrapper)
        .find('div')
        .at(1)
      expect(inputWrapper).toHaveStyleRule('border-left', '4px solid #d4351c')
      expect(inputWrapper).toHaveStyleRule('margin-right', '15px')
      expect(inputWrapper).toHaveStyleRule('padding-left', '10px')
    })
  })

  describe('with a custom error message', () => {
    test('should render error message', () => {
      const myErrorMesage = 'A custom error occurred'
      const wrapper = mount(
        <FormStateful>
          <FieldTypeahead name="testField" errorMessage={myErrorMesage} />
        </FormStateful>
      )

      expect(wrapper.find(ErrorText).text()).toEqual(myErrorMesage)

      const inputWrapper = wrapper
        .find(FieldWrapper)
        .find('div')
        .at(1)
      expect(inputWrapper).toHaveStyleRule('border-left', '4px solid #b10e1e')
      expect(inputWrapper).toHaveStyleRule('margin-right', '15px')
      expect(inputWrapper).toHaveStyleRule('padding-left', '10px')
    })
  })

  describe('when the text is typed to the typeahead', () => {
    test('should update field value', async () => {
      const Value = () => {
        const { values } = useFormContext()
        return <pre>{JSON.stringify(values.testField)}</pre>
      }

      const options = [
        { label: '1', value: 'one' },
        { label: '2', value: 'two' },
      ]
      const wrapper = mount(
        <FormStateful>
          <FieldTypeahead
            name="testField"
            options={options}
            menuIsOpen={true}
            classNamePrefix="react-select"
          />
          <Value />
        </FormStateful>
      )

      act(() => {
        const selectWrapper = wrapper.find(Typeahead).find('Select')
        selectWrapper.instance().selectOption(options[0])
      })

      expect(wrapper.find('pre').text()).toEqual('{"label":"1","value":"one"}')
    })
  })

  describe('when extra props are passed to the component', () => {
    test('should render typeahead with all the extra props', () => {
      const wrapper = mount(
        <FormStateful>
          <FieldTypeahead
            name="testField"
            placeholder="Type to search"
            isMulti={false}
          />
        </FormStateful>
      )
      const typeahead = wrapper.find(Typeahead)
      expect(typeahead.prop('placeholder')).toEqual('Type to search')
      expect(typeahead.prop('isMulti')).toEqual(false)
    })
  })
})
