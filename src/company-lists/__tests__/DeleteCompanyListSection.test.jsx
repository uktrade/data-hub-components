import React from 'react'
import { mount } from 'enzyme'
import Button from '@govuk-react/button'
import ErrorSummary from '@govuk-react/error-summary'
import ListItem from '@govuk-react/list-item'

import DeleteCompanyListSection from '../DeleteCompanyListSection'

const baseCompanyList = {
  id: '2a8fb06f-2099-44d6-b404-e0fae0b9ea59',
  name: 'test list name',
  created_on: '2018-01-01T15:20:23Z',
}

describe('DeleteCompanyListSection', () => {
  describe('common behaviour', () => {
    let wrapper
    const onDeleteSpy = jest.fn()
    const companyList = {
      ...baseCompanyList,
      item_count: 45,
    }

    beforeAll(() => {
      wrapper = mount(
        <DeleteCompanyListSection
          companyList={companyList}
          onDelete={onDeleteSpy}
          returnUrl="test-return-url"
        />
      )
    })

    test('can be instantiated', () => {
      expect(wrapper.find(DeleteCompanyListSection).exists()).toBeTruthy()
    })

    test('displays the list name', () => {
      expect(
        wrapper
          .find(ListItem)
          .first()
          .text()
      ).toEqual(companyList.name)
    })

    test('triggers the onDelete callback on click', () => {
      wrapper.find(Button).simulate('click')
      expect(onDeleteSpy).toHaveBeenCalledTimes(1)
    })

    test('does not display an error message by default', () => {
      expect(wrapper.find(ErrorSummary).exists()).toBeFalsy()
    })
  })

  describe('with error message', () => {
    test('displays the error message', () => {
      const companyList = {
        ...baseCompanyList,
        item_count: 10,
      }
      const wrapper = mount(
        <DeleteCompanyListSection
          companyList={companyList}
          onDelete={jest.fn()}
          returnUrl="test-return-url"
          errorMessage="Request failed"
        />
      )

      expect(wrapper.find(ErrorSummary).exists()).toBeTruthy()
    })
  })

  describe('with multiple or no items', () => {
    test.each([0, 20])(
      'displays the correct count for %s items',
      (itemCount) => {
        const companyList = {
          ...baseCompanyList,
          item_count: itemCount,
        }
        const wrapper = mount(
          <DeleteCompanyListSection
            companyList={companyList}
            onDelete={jest.fn()}
            returnUrl="test-return-url"
          />
        )

        expect(
          wrapper
            .find(ListItem)
            .at(1)
            .text()
        ).toEqual(`${itemCount} companies`)
      }
    )
  })

  describe('with one item', () => {
    test('displays the correct item count', () => {
      const companyList = {
        ...baseCompanyList,
        item_count: 1,
      }
      const wrapper = mount(
        <DeleteCompanyListSection
          companyList={companyList}
          onDelete={jest.fn()}
          returnUrl="test-return-url"
        />
      )

      expect(
        wrapper
          .find(ListItem)
          .at(1)
          .text()
      ).toEqual(`${companyList.item_count} company`)
    })
  })
})
