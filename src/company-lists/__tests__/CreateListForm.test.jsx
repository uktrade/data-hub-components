import React from 'react'
import { mount } from 'enzyme'
import HintText from '@govuk-react/hint-text'
import ErrorText from '@govuk-react/error-text'

import CreateListForm from '../CreateListForm'

describe('CreateListForm', () => {
  describe('When passing props', () => {
    const wrapper = mount(
      <CreateListForm
        onSubmitHandler={() => {}}
        name="listName"
        hint="Hint"
        label="List name"
        cancelUrl="/companies/"
        maxLength={30}
      />,
    )
    const input = wrapper.find('input')
    const label = wrapper.find('label').at(0)
    const hint = wrapper.find('span').at(0)
    const button = wrapper.find('button')
    const cancelUrl = wrapper.find('a[href="/companies/"]')

    test('should render correctly', () => {
      expect(label.text()).toEqual('List name')
      expect(hint.text()).toEqual('Hint')
      expect(input).toHaveLength(1)
      expect(button).toHaveLength(1)
      expect(cancelUrl).toHaveLength(1)
    })
  })

  describe('When not passing props that are not required', () => {
    const wrapper = mount(
      <CreateListForm
        onSubmitHandler={() => {}}
        name="listName"
        cancelUrl="/companies/"
        label="List name"
        maxLength={30}
      />,
    )
    const hint = wrapper.find(HintText)
    const cancelUrl = wrapper.find('a[href="/companies/"]')

    test('should render correctly', () => {
      expect(hint.exists()).toBeFalsy()
      expect(cancelUrl).toHaveLength(1)
    })
  })

  describe('when submitting with no errors', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = mount(
      <CreateListForm
        onSubmitHandler={onSubmitSpy}
        name="listName"
        cancelUrl="/companies/"
        label="List name"
        maxLength={30}
      />,
    )

    test('should fire a onSubmit handler', () => {
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'list name' } })
      wrapper.simulate('submit')
      expect(onSubmitSpy).toBeCalledTimes(1)
    })
  })

  describe('when submitting form with errors', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = mount(
      <CreateListForm
        onSubmitHandler={onSubmitSpy}
        name="listName"
        cancelUrl="/companies/"
        label="List name"
        maxLength={30}
      />,
    )

    test('should prompt for a list name', () => {
      wrapper.simulate('submit')
      expect(onSubmitSpy).toBeCalledTimes(0)
      expect(wrapper.find(ErrorText).text()).toEqual('Enter a name for your list')
    })

    test('should ask for less than 30 characters', () => {
      const input = wrapper.find('input')
      input.simulate('change', { target: { value: 'oneverylooooooooooooooooooooooooooooooooooooonnnnnngggg name' } })
      wrapper.simulate('submit')
      expect(onSubmitSpy).toBeCalledTimes(0)
      expect(wrapper.find(ErrorText).text()).toEqual('Enter list name which is no longer than 30 characters')
    })
  })
})
