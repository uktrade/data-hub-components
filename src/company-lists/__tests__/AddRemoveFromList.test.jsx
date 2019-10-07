import React from 'react'
import { mount } from 'enzyme'

import AddRemoveFromListForm from '../AddRemoveFromListForm'
import listsWithCompany from '../__fixtures__/lists-with-company'

describe('AddRemoveFromList', () => {
  describe('When passing props', () => {
    const wrapper = mount(
      <AddRemoveFromListForm
        list={listsWithCompany}
        onSubmitHandler={() => {}}
        isLoading={false}
        createNewListUrl="/create-url"
        cancelLinkUrl="/cancel-link"
      />
    )
    const fieldset = wrapper.find('fieldset')
    const radioButtons = wrapper.find('input[type="radio"]')
    const legends = wrapper.find('legend')
    const optionLabels = wrapper.find('fieldset label span')
    const createNewListLink = wrapper.find('a[href="/create-url"]')
    const saveButton = wrapper.find('button')
    const cancelLink = wrapper.find('a[href="/cancel-link"]')

    test('should render a group of radio button options for list A', () => {
      expect(legends.at(0).text()).toEqual('On the "List A" list')
      expect(fieldset.at(0)).toHaveLength(1)
      expect(radioButtons.at(0)).toHaveLength(1)
      expect(radioButtons.at(1)).toHaveLength(1)
      expect(optionLabels.at(0).text()).toEqual('Yes')
      expect(optionLabels.at(1).text()).toEqual('No')
    })

    test('should render a group of radio button options for list B', () => {
      expect(legends.at(1).text()).toEqual('On the "List B" list')
      expect(fieldset.at(1)).toHaveLength(1)
      expect(radioButtons.at(2)).toHaveLength(1)
      expect(radioButtons.at(3)).toHaveLength(1)
      expect(optionLabels.at(2).text()).toEqual('Yes')
      expect(optionLabels.at(3).text()).toEqual('No')
    })

    test('should render a group of radio button options for list C', () => {
      expect(legends.at(2).text()).toEqual('On the "List C" list')
      expect(fieldset.at(2)).toHaveLength(1)
      expect(radioButtons.at(4)).toHaveLength(1)
      expect(radioButtons.at(5)).toHaveLength(1)
      expect(optionLabels.at(4).text()).toEqual('Yes')
      expect(optionLabels.at(5).text()).toEqual('No')
    })

    test('should render a "Create a new list" button', () => {
      expect(createNewListLink.text()).toEqual('Create a new list')
    })

    test('should render a "Save" button', () => {
      expect(saveButton.text()).toEqual('Save')
    })

    test('should render a "Cancel" link', () => {
      expect(cancelLink.text()).toEqual('Cancel')
    })
  })

  describe('when saving options', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = mount(
      <AddRemoveFromListForm
        list={listsWithCompany}
        onSubmitHandler={onSubmitSpy}
        isLoading={false}
        createNewListUrl="/create-url"
        cancelLinkUrl="/cancel-link"
      />
    )
    test('should fire a onSubmit handler', () => {
      wrapper.simulate('submit')
      expect(onSubmitSpy).toBeCalledTimes(1)
    })
  })
})
