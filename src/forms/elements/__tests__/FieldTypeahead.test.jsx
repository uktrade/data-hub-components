import React from 'react'
import { mount } from 'enzyme'
import HintText from '@govuk-react/hint-text'
import Label from '@govuk-react/label'
import ErrorText from '@govuk-react/error-text'
import { act } from 'react-dom/test-utils'

import Form from '../Form'
import FieldTypeahead from '../FieldTypeahead'
import FieldWrapper from '../FieldWrapper'
import Typeahead from '../../../typeahead/Typeahead'
import useFormContext from '../../hooks/useFormContext'

describe('FieldTypeahead', () => {
  describe('when the field is mounted', () => {
    test('should set default attributes on the typeahead element', () => {
      const wrapper = mount(
        <Form initialValues={{ testField: { label: 'someValueLabel' } }}>
          <FieldTypeahead name="testField" />
        </Form>
      )
      const typeahead = wrapper.find(Typeahead)
      expect(typeahead.prop('inputId')).toEqual('testField')
      expect(typeahead.prop('defaultValue')).toEqual({
        label: 'someValueLabel',
      })
      expect(typeahead.prop('onBlur')).toBeInstanceOf(Function)
      expect(typeahead.prop('onChange')).toBeInstanceOf(Function)
    })
  })

  describe('when the field does specify a label', () => {
    test('should render the typeahead and a label', () => {
      const wrapper = mount(
        <Form>
          <FieldTypeahead name="testField" label="testLabel" />
        </Form>
      )
      expect(wrapper.find(Label).exists()).toBe(true)
      expect(wrapper.find(Typeahead).prop('aria-label')).toEqual('testLabel')
    })
  })

  describe('when the field does not specify a label', () => {
    test('should render the field without a label', () => {
      const wrapper = mount(
        <Form>
          <FieldTypeahead name="testField" />
        </Form>
      )
      expect(wrapper.find(Label).exists()).toBe(false)
      expect(wrapper.find(Typeahead).prop('aria-label')).toEqual(null)
    })
  })

  describe('when the field does specify a legend', () => {
    test('should render the field with a legend', () => {
      const wrapper = mount(
        <Form>
          <FieldTypeahead name="testField" legend="testLegend" />
        </Form>
      )
      expect(wrapper.find('legend').text()).toEqual('testLegend')
      expect(wrapper.find(Typeahead).prop('aria-label')).toEqual('testLegend')
    })
  })

  describe('when the field does specify a hint', () => {
    test('should render the field with a legend', () => {
      const wrapper = mount(
        <Form>
          <FieldTypeahead name="testField" hint="testHint" />
        </Form>
      )
      expect(wrapper.find(HintText).text()).toEqual('testHint')
    })
  })

  describe('when the validation fails', () => {
    test('should render error message', () => {
      const wrapper = mount(
        <Form>
          <FieldTypeahead name="testField" validate={() => 'testError'} />
        </Form>
      )
      wrapper.find('form').simulate('submit')

      expect(wrapper.find(ErrorText).text()).toEqual('testError')

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
        <Form>
          <FieldTypeahead
            name="testField"
            options={options}
            menuIsOpen={true}
            classNamePrefix="react-select"
          />
          <Value />
        </Form>
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
        <Form>
          <FieldTypeahead
            name="testField"
            placeholder="Type to search"
            isMulti={false}
          />
        </Form>
      )
      const typeahead = wrapper.find(Typeahead)
      expect(typeahead.prop('placeholder')).toEqual('Type to search')
      expect(typeahead.prop('isMulti')).toEqual(false)
    })
  })
})
