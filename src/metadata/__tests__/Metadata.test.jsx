import React from 'react'
import { mount } from 'enzyme'

import Link from '@govuk-react/link'
import Metadata from '../Metadata'

describe('Metadata', () => {
  let wrapper

  describe('when "rows" prop was passed with no values', () => {
    beforeAll(() => {
      wrapper = mount(<Metadata rows={null} />)
    })

    test('should not render anything', () => {
      expect(wrapper.html()).toEqual(null)
    })
  })

  describe('when a "rows" prop is passed with values', () => {
    beforeAll(() => {
      wrapper = mount(
        <Metadata
          rows={[
            { label: 'Updated on', value: '5 September 2019' },
            {
              label: 'Parent company',
              value: <Link href="http://example.com">E-corp LTD</Link>,
            },
          ]}
        />
      )
    })

    test('should render all metadata items', () => {
      expect(wrapper.text()).toContain(
        'Updated on 5 September 2019Parent company E-corp LTD'
      )
    })
  })
})
