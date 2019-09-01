import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import Form from '../Form'
import Step from '../Step'
import FieldDnbCompany from '../FieldDnbCompany'
import { setupSuccessMocks } from '../../../entity-search/__mocks__/company-search'
import entitySearchFixtures from '../../../entity-search/__fixtures__'

const API_ENDPOINT = 'http://localhost:3010/v4/dnb/company-search'

const flushPromises = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

describe('FieldDnbCompany', () => {
  let wrapper

  describe('when all fields have been specified', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form>
          <FieldDnbCompany
            name="testField"
            label="testLabel"
            country="UK"
            apiEndpoint={API_ENDPOINT}
          />
        </Form>,
      )
    })

    test('should render the field with a label', () => {
      expect(wrapper.find('label').at(0).text()).toEqual('testLabel')
    })

    test('should render the field with the previously selected country', () => {
      expect(wrapper.find('p').text()).toContain('Based in the UK')
    })

    test('should render the field with filters', () => {
      expect(wrapper.find('label').at(1).text()).toEqual('Company name')
      expect(wrapper.find('[name="search_term"]').exists()).toBeTruthy()
      expect(wrapper.find('label').at(2).text()).toEqual('Company postcode (optional)')
      expect(wrapper.find('[name="postal_code"]').exists()).toBeTruthy()
    })
  })

  describe('when the company country "Change" link is clicked', () => {
    beforeAll(() => {
      wrapper = mount(
        <Form initialStep={1}>
          {({ currentStep }) => (
            <>
              <div className="current-step">{currentStep}</div>
              <FieldDnbCompany
                name="testField"
                label="testLabel"
                country="UK"
                apiEndpoint={API_ENDPOINT}
              />
            </>
          )}
        </Form>,
      )

      wrapper.find('[href="#previously-selected"]').at(0).simulate('click')
    })

    test('should go back to the first step', () => {
      expect(wrapper.find('.current-step').text()).toEqual('0')
    })
  })

  describe('when the "Search" button is clicked', () => {
    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

      wrapper = mount(
        <Form initialStep={1}>
          {({ currentStep, values }) => (
            <>
              <div className="current-step">{currentStep}</div>
              <div className="field-value">{JSON.stringify(values.testField)}</div>

              <Step name="first" />
              <Step name="second">
                <FieldDnbCompany
                  name="testField"
                  label="testLabel"
                  country="UK"
                  apiEndpoint={API_ENDPOINT}
                />
              </Step>
              <Step name="third" />

            </>
          )}
        </Form>,
      )

      wrapper.find('Search').simulate('click')

      await act(flushPromises)

      wrapper.update()
    })

    test('should render entities', () => {
      const entityList = wrapper.find('ol')
      expect(entityList.find('li').length).toEqual(2)
    })

    test('should render cannot find actions', () => {
      const actionList = wrapper.find('ul')
      expect(actionList.find('li').length).toEqual(3)
    })

    describe('when an entity is clicked', () => {
      beforeAll(() => {
        wrapper.find('StyledEntity').at(1).simulate('click')
      })

      test('should set the field value', () => {
        const expected = JSON.stringify(entitySearchFixtures.companySearch.results[1].dnb_company)
        expect(wrapper.find('.field-value').text()).toEqual(expected)
      })

      test('should go to the third step', () => {
        expect(wrapper.find('.current-step').text()).toEqual('2')
      })
    })
  })
})
