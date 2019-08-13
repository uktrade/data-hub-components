import React from 'react'
import { mount } from 'enzyme'

import Form from '../Form'
import FieldInput from '../../elements/FieldInput'

describe('Form', () => {
  describe('when form has many fields', () => {
    test('should render all 14 fields without issue', () => {
      const wrapper = mount(
        <Form>
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
        </Form>,
      )
      expect(wrapper.find(FieldInput).length).toEqual(14)
    })
  })

  describe('when complete form is submitted', () => {
    test('should call onSubmit function', () => {
      const onSubmitSpy = jest.fn()
      const wrapper = mount(
        <Form onSubmit={onSubmitSpy}>
          <FieldInput name="testField" type="text" />
        </Form>,
      )
      const input = wrapper.find(FieldInput)
      input.simulate('change', { target: { value: 'hello' } })
      wrapper.simulate('submit')

      expect(onSubmitSpy).toBeCalledTimes(1)
    })
  })

  describe('when incomplete form is submitted', () => {
    test('should validate each field', () => {
      const wrapper = mount(
        <Form>
          {form => (
            <>
              <div className="form-state">{JSON.stringify(form)}</div>
              <FieldInput type="text" name="testField1" validate={() => 'testError1'} />
              <FieldInput type="text" name="testField2" validate={() => 'testError2'} />
              <button type="submit" className="submit" onClick={form.validateForm}>Submit</button>
            </>
          )}
        </Form>,
      )
      const submit = wrapper.find('.submit')
      submit.simulate('click')

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
      const onSubmitSpy = jest.fn()
      const wrapper = mount(
        <Form onSubmit={onSubmitSpy}>
          {form => (
            <>
              <div className="form-state">{JSON.stringify(form)}</div>
              <FieldInput type="text" name="testField" validate={() => 'testError'} />
            </>
          )}
        </Form>,
      )
      wrapper.simulate('submit')
      expect(onSubmitSpy).toHaveBeenCalledTimes(0)
    })
  })
})
