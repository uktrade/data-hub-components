import React from 'react'
import { mount } from 'enzyme'
import MyCompaniesFilters from './MyCompaniesFilters'
import useMyCompaniesContext from './useMyCompaniesContext'

describe('MyCompaniesFilters', () => {
  const mockDispatch = jest.fn()
  test('renders company filters', () => {
    const wrapper = mount(
      <useMyCompaniesContext.Provider>
        <MyCompaniesFilters />
      </useMyCompaniesContext.Provider>,
    )
    expect(wrapper.debug()).toMatchSnapshot()
  })

  describe('Select', () => {
    test('should call store actions when event handler fires', () => {
      const wrapper = mount(
        <useMyCompaniesContext.Provider mockProps={{ dispatch: mockDispatch }}>
          <MyCompaniesFilters />
        </useMyCompaniesContext.Provider>,
      )
      wrapper.find('select').simulate('change', { target: { value: 'recent' } })

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'sortBy',
        sortType: 'recent',
      })
    })
  })

  describe('Search', () => {
    test('should call store actions when event handler fires', () => {
      const wrapper = mount(
        <useMyCompaniesContext.Provider mockProps={{ dispatch: mockDispatch }}>
          <MyCompaniesFilters />
        </useMyCompaniesContext.Provider>,
      )
      wrapper.find('input').simulate('change', { target: { value: 'hello' } })

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'filterBy',
        filterText: 'hello',
      })
    })
  })
})
