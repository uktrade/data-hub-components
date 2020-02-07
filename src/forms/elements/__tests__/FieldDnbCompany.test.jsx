/* eslint-disable react/prop-types */

import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Details from '@govuk-react/details'

import ButtonLink from '../../../button-link/ButtonLink'
import EntityList from '../../../entity-search/EntityList'
import FieldUneditable from '../FieldUneditable'
import FieldInput from '../FieldInput'
import FormActions from '../FormActions'
import FieldDnbCompany from '../FieldDnbCompany'
import Form from '../Form'
import Step from '../Step'
import StatusMessage from '../../../status-message/StatusMessage'
import {
  setupErrorMocks,
  setupNoResultsMocks,
  setupSuccessMocks,
} from '../../../entity-search/__mocks__/company-search'
import { flushPromises } from '../../../utils/enzyme'

const API_ENDPOINT = 'http://localhost:3010/v4/dnb/company-search'

const performSearch = async (wrapper, companyName = 'test value') => {
  wrapper
    .find('input[name="dnbCompanyName"]')
    .simulate('change', { target: { value: companyName } })

  wrapper
    .find(FormActions)
    .find('button')
    .simulate('click')

  await act(flushPromises)

  wrapper.update()
}

const wrapFieldDnbCompanyForm = (fieldProps) => {
  return mount(
    <Form initialStep={1}>
      {({ currentStep, values }) => (
        <>
          <div className="current-step">{currentStep}</div>
          <div className="field-value">{JSON.stringify(values.testField)}</div>
          <div className="field-cannot-find">
            {JSON.stringify(values.cannotFind)}
          </div>

          <Step name="first" />

          <Step name="second" backButton={null} forwardButton={null}>
            <FieldDnbCompany
              name="testField"
              label="testLabel"
              country="UK"
              apiEndpoint={API_ENDPOINT}
              {...fieldProps}
            />
          </Step>

          {!values.cannotFind && <Step name="third">third</Step>}

          {values.cannotFind && <Step name="fourth">fourth</Step>}
        </>
      )}
    </Form>
  )
}

describe('FieldDnbCompany', () => {
  let wrapper

  describe('when all fields have been specified', () => {
    beforeAll(() => {
      wrapper = wrapFieldDnbCompanyForm()
    })

    test('should render the field with a label', () => {
      expect(
        wrapper
          .find('label')
          .at(0)
          .text()
      ).toEqual('testLabel')
    })

    test('should render the field with the previously selected country', () => {
      const prevSelectedText = wrapper.find(FieldUneditable).text()
      expect(prevSelectedText).toContain('Country')
      expect(prevSelectedText).toContain('UK')
      expect(prevSelectedText).toContain('Change Country')
    })

    test('should render the company name filter', () => {
      expect(
        wrapper
          .find(FieldInput)
          .at(0)
          .text()
      ).toEqual('Company name')
    })

    test('should limit the number of characters in the company name filter to 30', () => {
      expect(
        wrapper
          .find(FieldInput)
          .at(0)
          .prop('maxLength')
      ).toEqual(30)
    })

    test('should render the company postcode filter', () => {
      expect(
        wrapper
          .find(FieldInput)
          .at(1)
          .text()
      ).toEqual('Company postcode (optional)')
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

      wrapper
        .find(FieldUneditable)
        .find(ButtonLink)
        .simulate('click')
    })

    test('should go back to the first step', () => {
      expect(wrapper.find('.current-step').text()).toEqual('0')
    })
  })

  describe('when the search button is clicked with empty company name field', () => {
    beforeAll(async () => {
      wrapper = wrapFieldDnbCompanyForm()

      wrapper
        .find(FormActions)
        .find('button')
        .simulate('click')

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

  describe('when the search button is clicked with company name shorter than the minimum of 2 characters', () => {
    beforeAll(async () => {
      wrapper = wrapFieldDnbCompanyForm()

      wrapper
        .find('input[name="dnbCompanyName"]')
        .simulate('change', { target: { value: 'a' } })

      wrapper
        .find(FormActions)
        .find('button')
        .simulate('click')

      await act(flushPromises)

      wrapper.update()
    })

    test('should show an error', () => {
      expect(wrapper.text()).toContain(
        'Enter company name that is 2 characters long or more'
      )
    })
  })

  describe('when the search button is clicked after filling the company name field', () => {
    let axiosMock

    beforeAll(async () => {
      axiosMock = setupSuccessMocks(API_ENDPOINT)

      wrapper = wrapFieldDnbCompanyForm()
      await performSearch(wrapper)
    })

    afterAll(() => {
      axiosMock.restore()
    })

    test('should render the field with an entity list header', () => {
      expect(wrapper.find(StatusMessage).exists()).toBeTruthy()
    })

    test('should render entities', () => {
      const entityList = wrapper.find(EntityList)
      expect(entityList.find('li').length).toEqual(3)
    })

    test('should render cannot find actions', () => {
      expect(wrapper.text()).toContain('Try:')
    })
  })

  describe('when an error is returned while searching for company', () => {
    beforeAll(async () => {
      setupErrorMocks(API_ENDPOINT)
      wrapper = wrapFieldDnbCompanyForm()
      await performSearch(wrapper)
    })

    test('should not show the entities', () => {
      expect(wrapper.find(EntityList).exists()).toBeFalsy()
    })

    test('should show an error', () => {
      expect(wrapper.find(StatusMessage).text()).toEqual(
        'Error occurred while searching for company.'
      )
    })

    test('should display details for "unhappy path"', () => {
      expect(wrapper.find(Details).prop('summary')).toEqual(
        "I can't find what I'm looking for"
      )
    })
  })

  describe('when no companies were returned while searching for company', () => {
    beforeAll(async () => {
      setupNoResultsMocks(API_ENDPOINT)
      wrapper = wrapFieldDnbCompanyForm()
      await performSearch(wrapper)
    })

    test('should not show the entities', () => {
      expect(wrapper.find(EntityList).exists()).toBeFalsy()
    })

    test('should show a warning', () => {
      expect(wrapper.find(StatusMessage).text()).toEqual(
        'There are no companies to show.'
      )
    })

    test('should display details for "unhappy path"', () => {
      expect(wrapper.find(Details).prop('summary')).toEqual(
        "I can't find what I'm looking for"
      )
    })
  })

  describe('when custom "entityRenderer" is passed', () => {
    test('should render the entities "our way"', async () => {
      setupSuccessMocks(API_ENDPOINT)

      const CustomEntityRenderer = ({ id }) => <div>_{id}_</div>

      const customEntityWrapper = wrapFieldDnbCompanyForm({
        entityRenderer: CustomEntityRenderer,
      })

      await performSearch(customEntityWrapper)

      expect(customEntityWrapper.find(EntityList).text()).toEqual(
        '_12345678__219999999__219999996_'
      )
    })
  })

  describe(`when "I still can't find what I'm looking for" link is clicked`, () => {
    test('should call callback defined in the "onChangeClickSpy" prop', async () => {
      setupSuccessMocks(API_ENDPOINT)
      const onCannotFindSpy = jest.fn()
      const fieldWrapper = wrapFieldDnbCompanyForm({
        onCannotFind: onCannotFindSpy,
      })
      await performSearch(fieldWrapper)
      fieldWrapper
        .find(Details)
        .find('button')
        .simulate('click')

      expect(fieldWrapper.text()).not.toContain('fourth')
      expect(fieldWrapper.text()).toContain(
        "I still can't find what I'm looking for"
      )
      expect(onCannotFindSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the "country" prop is NOT empty and the search yields results', () => {
    test('should render "making sure you selected the correct country" tip for search', async () => {
      setupSuccessMocks(API_ENDPOINT)

      const fieldWrapper = wrapFieldDnbCompanyForm({
        country: undefined,
      })

      await performSearch(fieldWrapper)

      expect(fieldWrapper.find('ul').text()).toEqual(
        'checking for spelling errors' +
          "check you're using the company's registered name" +
          'checking or removing the postcode' +
          'removing "limited" or "ltd"'
      )
    })
  })

  describe('when the "country" prop is empty and the search yields results', () => {
    test('should render "making sure you selected the correct country" tip for search', async () => {
      setupSuccessMocks(API_ENDPOINT)

      const fieldWrapper = wrapFieldDnbCompanyForm({
        country: 'Test country',
        onCannotFind: jest.fn(),
      })

      await performSearch(fieldWrapper)

      expect(fieldWrapper.find('ul').text()).toEqual(
        'checking for spelling errors' +
          'checking if the right country was selected' +
          "check you're using the company's registered name" +
          'checking or removing the postcode' +
          'removing "limited" or "ltd"'
      )
    })
  })
})
