import React from 'react'
import { mount } from 'enzyme'
import EntityList from '../EntityList'
import EntityListItem from '../EntityListItem'
import EntitySearch from '../EntitySearch'

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

describe('EntitySearch', () => {
  let wrappedEntitySearch
  const onEntityClickSpy = jest.fn()

  describe('when filters are defined as children', () => {
    beforeAll(() => {
      wrappedEntitySearch = mount(
        <EntitySearch onEntityClick={onEntityClickSpy}>
          test filters
        </EntitySearch>,
      )
    })

    test('should show the filters', () => {
      expect(wrappedEntitySearch.text()).toEqual('test filters')
    })
  })

  describe('when the "entityListHeader" prop is specified and there are no entities', () => {
    beforeAll(() => {
      wrappedEntitySearch = mount(
        <EntitySearch
          onEntityClick={onEntityClickSpy}
          entityListHeader="test header"
        />,
      )
    })

    test('should not display the header', () => {
      expect(wrappedEntitySearch.text()).toEqual('')
    })
  })

  describe('when the "entityListHeader" prop is specified and there are entities', () => {
    beforeAll(() => {
      wrappedEntitySearch = mount(
        <EntitySearch
          onEntityClick={onEntityClickSpy}
          entityListHeader="test header"
          entities={entitiesFixture}
        />,
      )
    })

    test('should display the header', () => {
      expect(wrappedEntitySearch.text()).toContain('test header')
    })
  })

  describe('when the "entityListFooter" prop is specified and there are no entities', () => {
    beforeAll(() => {
      wrappedEntitySearch = mount(
        <EntitySearch
          onEntityClick={onEntityClickSpy}
          entityListFooter="test footer"
        />,
      )
    })

    test('should not display the footer', () => {
      expect(wrappedEntitySearch.text()).toEqual('')
    })
  })

  describe('when the "entityListFooter" prop is specified and there are entities', () => {
    beforeAll(() => {
      wrappedEntitySearch = mount(
        <EntitySearch
          onEntityClick={onEntityClickSpy}
          entityListFooter="test footer"
          entities={entitiesFixture}
        />,
      )
    })

    test('should display the footer', () => {
      expect(wrappedEntitySearch.text()).toContain('test footer')
    })
  })

  describe('when there are entities', () => {
    beforeAll(() => {
      wrappedEntitySearch = mount(
        <EntitySearch
          onEntityClick={onEntityClickSpy}
          entities={entitiesFixture}
        />,
      )
    })

    afterEach(() => {
      onEntityClickSpy.mockReset()
    })

    test('should display the entity list', () => {
      expect(wrappedEntitySearch.find(EntityListItem).length).toEqual(2)
    })

    describe('when the first entity is clicked', () => {
      test('should not call the onEntityClick event', () => {
        wrappedEntitySearch
          .find(EntityListItem)
          .at(0)
          .simulate('click')

        expect(onEntityClickSpy.mock.calls.length).toEqual(0)
      })
    })

    describe('when the second entity is clicked', () => {
      test('should call the onEntityClick event', () => {
        wrappedEntitySearch
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

  describe('when the "error" prop is specified', () => {
    const error = 'Error occurred while searching entities.'
    beforeAll(() => {
      wrappedEntitySearch = mount(
        <EntitySearch
          onEntityClick={onEntityClickSpy}
          error={error}
        />,
      )
    })

    test('should not show the entities', () => {
      expect(wrappedEntitySearch.find(EntityList).exists()).toBeFalsy()
    })

    test('should show an error', () => {
      expect(wrappedEntitySearch.find('p').text()).toEqual(error)
    })
  })

  describe('when there are 0 entities', () => {
    beforeAll(() => {
      wrappedEntitySearch = mount(
        <EntitySearch
          onEntityClick={onEntityClickSpy}
          entities={[]}
        />,
      )
    })

    test('should not show the entities', () => {
      expect(wrappedEntitySearch.find(EntityList).exists()).toBeFalsy()
    })

    test('should show a warning', () => {
      const expected = 'There are no entities to show.'
      expect(wrappedEntitySearch.find('p').text()).toEqual(expected)
    })
  })
})
