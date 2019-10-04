import React from 'react'
import { mount } from 'enzyme'
import EntityList from '../EntityList'
import EntityListItem from '../EntityListItem'

const entitiesFixture = [
  {
    id: '1',
    name: 'Non-clickable entity',
    heading: 'some heading',
    meta: {},
    data: {},
    canHandleClick: false,
  },
  {
    id: '2',
    name: 'Clickable entity',
    heading: 'some heading',
    meta: {},
    data: { some: 'data' },
    canHandleClick: true,
  },
]

describe('EntityList', () => {
  let wrapper
  const onEntityClickSpy = jest.fn()

  describe('when there are entities', () => {
    beforeAll(() => {
      wrapper = mount(
        <EntityList
          onEntityClick={onEntityClickSpy}
          entities={entitiesFixture}
        />
      )
    })

    test('should display the entity list', () => {
      expect(wrapper.find(EntityListItem).length).toEqual(2)
    })

    test('should pass the click callback to the "EntityListItem"', () => {
      expect(
        wrapper
          .find(EntityListItem)
          .first()
          .prop('onEntityClick')
      ).toEqual(onEntityClickSpy)
    })
  })

  describe('when there are 0 entities', () => {
    beforeAll(() => {
      wrapper = mount(
        <EntityList onEntityClick={onEntityClickSpy} entities={[]} />
      )
    })

    test('should not show the entity list items', () => {
      expect(wrapper.find(EntityListItem).exists()).toBeFalsy()
    })
  })
})
