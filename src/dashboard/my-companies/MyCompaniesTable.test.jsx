import React from 'react'
import { mount } from 'enzyme'
import MyCompaniesTable from './MyCompaniesTable'
import useMyCompaniesContext from './useMyCompaniesContext'
import companies from '../../../fixtures/Dashboard/companies'

describe('MyCompaniesTable', () => {
  test('should match the snapshot', () => {
    const wrapper = mount(
      <useMyCompaniesContext.Provider data={companies}>
        <MyCompaniesTable />
      </useMyCompaniesContext.Provider>,
    )
    expect(wrapper.debug()).toMatchSnapshot()
  })
})
