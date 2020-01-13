import React from 'react'
import { mount } from 'enzyme'
import Link from '@govuk-react/link'

import SummaryList from '../SummaryList'

describe('SummaryList', () => {
  describe('when "rows" prop was passed with no values', () => {
    test('should not render anything', () => {
      const wrapper = mount(<SummaryList rows={null} />)
      expect(wrapper.html()).toEqual(null)
    })
  })

  describe('when a "rows" prop is passed with values', () => {
    test('should render all metadata items', () => {
      const wrapper = mount(
        <SummaryList
          rows={[
            { label: 'Updated on:', value: '5 September 2019' },
            {
              label: 'Parent company',
              value: <Link href="http://example.com">E-corp LTD</Link>,
            },
          ]}
        />
      )

      expect(wrapper.find('dt')).toHaveLength(2)
      expect(wrapper.find('dd')).toHaveLength(2)
      expect(wrapper.text()).toEqual(
        'Updated on:5 September 2019Parent companyE-corp LTD'
      )
    })
  })

  describe('when array is passed as one of the row values', () => {
    test('should render items separated by a comma', () => {
      const wrapper = mount(
        <SummaryList
          rows={[
            {
              label: 'Value with array:',
              value: ['one', 'two', 'three'],
            },
          ]}
        />
      )
      expect(wrapper.text()).toEqual('Value with array:one, two, three')
    })
  })
})
