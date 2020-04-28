/* eslint-disable react/prop-types */

import React from 'react'
import { mount } from 'enzyme'
import EntityList from '../EntityList'
import EntityListItem from '../EntityListItem'

const entitiesFixture = [
  {
    id: '1',
    name: 'Non-clickable entity',
    heading: 'some heading',
    meta: [],
    data: {},
    canHandleClick: false,
  },
  {
    id: '2',
    name: 'Clickable entity',
    heading: 'some heading',
    meta: [],
    data: { some: 'data' },
    canHandleClick: true,
  },
]

describe('EntityList', () => {
  describe('when there are entities', () => {
    test('should display the entity list', () => {
      const wrapper = mount(<EntityList entities={entitiesFixture} />)
      expect(wrapper.find(EntityListItem).length).toEqual(2)
    })
  })

  describe('when there are 0 entities', () => {
    test('should not show the entity list items', () => {
      const wrapper = mount(<EntityList entities={[]} />)
      expect(wrapper.find(EntityListItem).exists()).toBeFalsy()
    })
  })

  describe('when custom "entityRenderer" is passed', () => {
    test('should render the entities "our way"', () => {
      const CustomEntityRenderer = ({ id }) => <div>_{id}_</div>
      const wrapper = mount(
        <EntityList
          entityRenderer={CustomEntityRenderer}
          entities={entitiesFixture}
        />
      )
      expect(wrapper.text()).toEqual('_1__2_')
    })
  })
})
