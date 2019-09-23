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
    data: { },
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
        />,
      )
    })

    afterEach(() => {
      onEntityClickSpy.mockReset()
    })

    test('should display the entity list', () => {
      expect(wrapper.find(EntityListItem).length).toEqual(2)
    })

    describe('when the first entity is clicked (which is non-clickable)', () => {
      test('should not call the onEntityClick event', () => {
        wrapper
          .find(EntityListItem)
          .at(0)
          .simulate('click')

        expect(onEntityClickSpy.mock.calls.length).toEqual(0)
      })
    })

    describe('when the second entity is clicked (which is clickable)', () => {
      test('should call the onEntityClick event', () => {
        wrapper
          .find(EntityListItem)
          .at(1)
          .simulate('click')

        expect(onEntityClickSpy.mock.calls.length).toEqual(1)
        expect(onEntityClickSpy.mock.calls[0][0]).toEqual({
          some: 'data',
        })
      })
    })
  })

  describe('when there are 0 entities', () => {
    beforeAll(() => {
      wrapper = mount(
        <EntityList
          onEntityClick={onEntityClickSpy}
          entities={[]}
        />,
      )
    })

    test('should not show the entity list items', () => {
      expect(wrapper.find(EntityListItem).exists()).toBeFalsy()
    })
  })
})
