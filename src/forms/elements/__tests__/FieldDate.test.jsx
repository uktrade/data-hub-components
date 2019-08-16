import React from 'react'
import { mount } from 'enzyme'

import Form from '../../core/Form'
import FieldDate from '../FieldDate'

describe('FieldDate', () => {
  let wrapper

  describe('when the field attribute name is defined', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldDate name="dob" />
        </Form>,
      )
    })

    test('should render 3 fields (day, month and year)', () => {
      expect(wrapper.find('input').length).toEqual(3)
    })

    test('should correctly set the id on the day field', () => {
      expect(wrapper.find('#day').exists()).toBeTruthy()
    })

    test('should correctly set the id on the month field', () => {
      expect(wrapper.find('#month').exists()).toBeTruthy()
    })

    test('should correctly set the id on the year field', () => {
      expect(wrapper.find('#year').exists()).toBeTruthy()
    })
  })

  describe('when the field attribute label is defined', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldDate name="dob" label="Date of birth" />
        </Form>,
      )
    })

    test('should render a Date of birth legend', () => {
      expect(wrapper.find('legend').text()).toEqual('Date of birth')
    })
  })
})
