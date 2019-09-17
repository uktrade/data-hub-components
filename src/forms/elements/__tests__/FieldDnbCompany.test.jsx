import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Details from '@govuk-react/details'

import ButtonLink from '../../../button-link/ButtonLink'
import EntityList from '../../../entity-search/EntityList'
import EntityListItem from '../../../entity-search/EntityListItem'
import FieldUneditable from '../FieldUneditable'
import FieldInput from '../FieldInput'
import FormActions from '../FormActions'
import FieldDnbCompany from '../FieldDnbCompany'
import Form from '../Form'
import Step from '../Step'
import StatusMessage from '../../../status-message/StatusMessage'
import { setupSuccessMocks } from '../../../entity-search/__mocks__/company-search'
import entitySearchFixtures from '../../../entity-search/__fixtures__'

const API_ENDPOINT = 'http://localhost:3010/v4/dnb/company-search'

const flushPromises = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

const wrapFieldDnbCompanyForm = () => {
  return mount(
    <Form initialStep={1}>
      {({ currentStep, values }) => (
        <>
          <div className="current-step">{currentStep}</div>
          <div className="field-value">{JSON.stringify(values.testField)}</div>
          <div className="field-cannot-find">{JSON.stringify(values.cannotFind)}</div>

          <Step name="first" />

          <Step name="second" hideBackButton={true} hideForwardButton={true}>
            <FieldDnbCompany
              name="testField"
              label="testLabel"
              country="UK"
              apiEndpoint={API_ENDPOINT}
            />
          </Step>

          {!values.cannotFind && (
            <Step name="third">third</Step>
          )}

          {values.cannotFind && (
            <Step name="fourth">fourth</Step>
          )}
        </>
      )}
    </Form>,
  )
}

describe('FieldDnbCompany', () => {
  let wrapper

  describe('when all fields have been specified', () => {
    beforeAll(() => {
      wrapper = wrapFieldDnbCompanyForm()
    })

    test('should render the field with a label', () => {
      expect(wrapper.find('label').at(0).text()).toEqual('testLabel')
    })

    test('should render the field with the previously selected country', () => {
      const prevSelectedText = wrapper.find(FieldUneditable).text()
      expect(prevSelectedText).toContain('Country')
      expect(prevSelectedText).toContain('UK')
      expect(prevSelectedText).toContain('Change Country')
    })

    test('should render the company name filter', () => {
      expect(wrapper.find(FieldInput).at(0).text())
        .toEqual('Company name')
    })

    test('should render the company postcode filter', () => {
      expect(wrapper.find(FieldInput).at(1).text())
        .toEqual('Company postcode (optional)')
    })

    test('should not initially render the field with an entity list header', () => {
      expect(wrapper.find(StatusMessage).exists()).toBeFalsy()
    })

    test('should not initially render the field with an entity list footer', () => {
      expect(wrapper.find(Details).exists()).toBeFalsy()
    })
  })

  describe('when the company country "Change" link is clicked', () => {
    beforeAll(() => {
      wrapper = wrapFieldDnbCompanyForm()

      wrapper.find(FieldUneditable).find(ButtonLink).simulate('click')
    })

    test('should go back to the first step', () => {
      expect(wrapper.find('.current-step').text()).toEqual('0')
    })
  })

  describe('when the search button is clicked with empty company name field', () => {
    beforeAll(async () => {
      wrapper = wrapFieldDnbCompanyForm()

      wrapper.find(FormActions).find('button').simulate('click')

      await act(flushPromises)

      wrapper.update()
    })

    test('should show an error', () => {
      expect(wrapper.text()).toContain('Enter company name')
    })

    test('should not render the field with an entity list header', () => {
      expect(wrapper.find(StatusMessage).exists()).toBeFalsy()
    })

    test('should not render the field with an entity list footer', () => {
      expect(wrapper.find(Details).exists()).toBeFalsy()
    })

    test('should not render entities', () => {
      expect(wrapper.find(EntityList).exists()).toBeFalsy()
    })
  })

  describe('when the search button is clicked after filling the company name field', () => {
    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

      wrapper = wrapFieldDnbCompanyForm()

      wrapper.find('input[name="dnbCompanyName"]')
        .simulate('change', { target: { value: 'test value' } })

      wrapper.find(FormActions).find('button').simulate('click')

      await act(flushPromises)

      wrapper.update()
    })

    test('should render the field with an entity list header', () => {
      expect(wrapper.find(StatusMessage).exists()).toBeTruthy()
    })

    test('should render entities', () => {
      const entityList = wrapper.find(EntityList)
      expect(entityList.find('li').length).toEqual(2)
    })

    test('should render cannot find actions', () => {
      expect(wrapper.text()).toContain('Try improving your search by')
    })
  })

  describe('when an entity is clicked', () => {
    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

      wrapper = wrapFieldDnbCompanyForm()

      wrapper.find('input[name="dnbCompanyName"]')
        .simulate('change', { target: { value: 'test value' } })

      wrapper.find(FormActions).find('button').simulate('click')

      await act(flushPromises)

      wrapper.update()

      wrapper.find(EntityListItem).at(1).simulate('click')
    })

    test('should set the field value', () => {
      const expected = JSON.stringify(entitySearchFixtures.companySearch.results[1].dnb_company)
      expect(wrapper.find('.field-value').text()).toEqual(expected)
    })

    test('should go to the third step', () => {
      expect(wrapper.find(Step).at(2).text()).toContain('third')
    })
  })

  describe('when the "I still cannot find the company" link is clicked', () => {
    beforeAll(async () => {
      setupSuccessMocks(API_ENDPOINT)

      wrapper = wrapFieldDnbCompanyForm()

      wrapper.find('input[name="dnbCompanyName"]')
        .simulate('change', { target: { value: 'test value' } })

      wrapper.find(FormActions).find('button').simulate('click')

      await act(flushPromises)

      wrapper.update()

      wrapper.find(Details).find('button').simulate('click')
    })

    test('should set the field cannot find to "true"', () => {
      expect(wrapper.find('.field-cannot-find').text()).toEqual('true')
    })

    test('should go to the fourth step', () => {
      expect(wrapper.find(Step).at(2).text()).toContain('fourth')
    })

    describe('when the "Back" button is clicked and a company is selected', () => {
      beforeAll(async () => {
        wrapper.find(ButtonLink).simulate('click')

        wrapper.update()

        wrapper.find('Search').simulate('click')

        await act(flushPromises)

        wrapper.update()

        wrapper.find(EntityListItem).at(1).simulate('click')
      })

      test('should set the field cannot find to "false"', () => {
        expect(wrapper.find('.field-cannot-find').text()).toEqual('false')
      })

      test('should go to the fourth step', () => {
        expect(wrapper.find(Step).at(2).text()).toContain('third')
      })

      test('should set the field value', () => {
        const expected = JSON.stringify(entitySearchFixtures.companySearch.results[1].dnb_company)
        expect(wrapper.find('.field-value').text()).toEqual(expected)
      })
    })
  })
})
