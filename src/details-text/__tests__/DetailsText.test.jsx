import React from 'react'
import { mount } from 'enzyme'

import DetailsText from '../DetailsText'

describe('DetailsText', () => {
  test('can be instantiated', () => {
    const wrapper = mount(
      <DetailsText />,
    )
    expect(wrapper.find(DetailsText).exists()).toBeTruthy()
  })
})
