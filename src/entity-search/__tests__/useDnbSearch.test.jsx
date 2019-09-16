import { renderHook } from '@testing-library/react-hooks'

import useDnbSearch from '../useDnbSearch'
import searchResultsFixture from '../__fixtures__/company-search'
import { setupErrorMocks, setupSuccessMocks } from '../__mocks__/company-search'

const API_ENDPOINT = 'http://localhost:8000/v4/dnb/company-search'

describe('useDnbSearch', () => {
  const { result } = renderHook(() => useDnbSearch(API_ENDPOINT))
  let axiosMock
  let response

  describe('when transformCompanyRecord() is called', () => {
    let transformedCompanyRecord

    beforeAll(() => {
      transformedCompanyRecord = result.current.transformCompanyRecord(
        searchResultsFixture.results[0],
      )
    })

    test('should return transformed company record', () => {
      expect(transformedCompanyRecord).toMatchSnapshot()
    })
  })

  describe('when findCompany() is called without any filters', () => {
    beforeAll(async () => {
      axiosMock = setupSuccessMocks(API_ENDPOINT)
      response = await result.current.findCompany()
    })

    test('should return all DNB search results', () => {
      expect(response).toMatchSnapshot()
    })
  })

  describe('when findCompany() is called with "search_term" filter', () => {
    beforeAll(async () => {
      axiosMock = setupSuccessMocks(API_ENDPOINT)
      response = await result.current.findCompany({
        search_term: 'some other company',
      })
    })

    test('should call endpoint with the specified filter', () => {
      expect(axiosMock.history.post[0].data).toEqual(JSON.stringify({
        search_term: 'some other company',
      }))
    })

    test('should return only "Some company name" company', () => {
      expect(response).toMatchSnapshot()
    })
  })

  describe('when findCompany() is called on endpoint which returns error', () => {
    beforeAll(async () => {
      axiosMock = setupErrorMocks(API_ENDPOINT)

      try {
        response = await result.current.findCompany()
      } catch (e) {
        response = e
      }
    })

    test('should return an error message', () => {
      expect(response.toString()).toEqual(
        'Error: Request failed with status code 500',
      )
    })
  })
})
