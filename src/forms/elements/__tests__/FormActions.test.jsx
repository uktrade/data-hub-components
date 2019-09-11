import React from 'react'
import { mount } from 'enzyme'
import FormActions from '../FormActions'

describe('FormActions', () => {
  test('can be instantiated', () => {
    const wrapper = mount(
      <FormActions />,
    )
    expect(wrapper.find(FormActions).exists()).toBeTruthy()
  })
})
