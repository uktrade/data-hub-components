import React from 'react'
import { mount } from 'enzyme'
import MyCompaniesFilters from '../MyCompaniesFilters'
import useMyCompaniesContext from '../useMyCompaniesContext'
import { withTargetValue } from '../../../utils/enzyme'

describe('MyCompaniesFilters', () => {
  describe('Select', () => {
    test('Should update context state on interaction', () => {
      const stateHistory = []

      const SomeComponent = () => {
        const { state: { filter, sortBy } } = useMyCompaniesContext()
        stateHistory.push({ filter, sortBy })
        return null
      }

      const wrapper = mount(
        <useMyCompaniesContext.Provider>
          <MyCompaniesFilters />
          <SomeComponent />
        </useMyCompaniesContext.Provider>,
      )

      wrapper.find('select')
        .simulate('change', withTargetValue('alphabetical'))
        .simulate('change', withTargetValue('least-recent'))
        .simulate('change', withTargetValue('recent'))

      wrapper.find('input')
        .simulate('change', withTargetValue('foo'))
        .simulate('change', withTargetValue('bar'))
        .simulate('change', withTargetValue('baz'))
        .simulate('change', withTargetValue(''))

      expect(stateHistory).toEqual([
        {
          filter: '',
          sortBy: 'recent',
        },
        {
          filter: '',
          sortBy: 'alphabetical',
        },
        {
          filter: '',
          sortBy: 'least-recent',
        },
        {
          filter: '',
          sortBy: 'recent',
        },
        {
          filter: 'foo',
          sortBy: 'recent',
        },
        {
          filter: 'bar',
          sortBy: 'recent',
        },
        {
          filter: 'baz',
          sortBy: 'recent',
        },
        {
          filter: '',
          sortBy: 'recent',
        },
      ])
    })
  })
})
