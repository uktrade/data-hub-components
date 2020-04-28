import React from 'react'
import { mount } from 'enzyme'
import { enzymeFind } from 'styled-components/test-utils'
import { H3 } from '@govuk-react/heading'
import InsetText from '@govuk-react/inset-text'

import EntityListItem from '../EntityListItem'
import Metadata from '../../metadata/Metadata'

describe('EntityListItem', () => {
  let wrapper
  let entityContainer
  const onEntityClickSpy = jest.fn()

  afterEach(() => {
    onEntityClickSpy.mockReset()
  })

  describe('when an empty entity is mounted', () => {
    beforeAll(() => {
      wrapper = mount(<EntityListItem id="test" />)
    })

    test('should not display the heading', () => {
      expect(wrapper.find(H3).exists()).toBeFalsy()
    })

    test('should not display the meta information', () => {
      expect(wrapper.find(Metadata).exists()).toBeFalsy()
    })

    test('should not display the inset text', () => {
      expect(enzymeFind(wrapper, InsetText).exists()).toBeFalsy()
    })
  })

  describe('when a clickable entity is mounted', () => {
    const data = { some: 'data' }

    beforeAll(() => {
      wrapper = mount(
        <EntityListItem
          id="test"
          data={data}
          canHandleClick={true}
          onEntityClick={onEntityClickSpy}
        />
      )
      entityContainer = wrapper.find('div')
    })

    test('should have styles for clickable element', () => {
      expect(entityContainer).toHaveStyleRule('cursor', 'pointer')
    })

    test('should make the entity tabbable', () => {
      expect(entityContainer.prop('tabIndex')).toEqual(0)
    })

    describe('when the "enter" key is pressed on the focused entity', () => {
      beforeAll(() => {
        entityContainer.simulate('keydown', { keyCode: 13 })
      })

      test('should call the "onEntityClick" event with the "data" prop', () => {
        expect(onEntityClickSpy.mock.calls.length).toEqual(1)
        expect(onEntityClickSpy.mock.calls[0][0]).toEqual(data)
      })
    })

    describe('when any key (except enter) is pressed on the focused entity', () => {
      beforeAll(() => {
        entityContainer.simulate('keydown', { keyCode: 10 })
      })

      test('should not call the "onEntityClick"', () => {
        expect(onEntityClickSpy.mock.calls.length).toEqual(0)
      })
    })

    describe('when the entity is clicked', () => {
      beforeAll(() => {
        wrapper.simulate('click')
      })

      test('should call the "onEntityClick" event with the "data" prop', () => {
        expect(onEntityClickSpy.mock.calls.length).toEqual(1)
        expect(onEntityClickSpy.mock.calls[0][0]).toEqual(data)
      })
    })
  })

  describe('when a non-clickable entity is mounted', () => {
    beforeAll(() => {
      wrapper = mount(<EntityListItem id="test" onEntityClick={null} />)
      entityContainer = wrapper.find('div')
    })

    test('should not have styles for clickable element', () => {
      expect(entityContainer).not.toHaveStyleRule('cursor', 'pointer')
    })

    test('should not make the entity tabbable', () => {
      expect(entityContainer.prop('tabIndex')).toBeUndefined()
    })

    describe('when the "enter" key is pressed on the focused entity', () => {
      beforeAll(() => {
        entityContainer.simulate('keydown', { keyCode: 13 })
      })

      test('should not call the "onEntityClick" event', () => {
        expect(onEntityClickSpy.mock.calls.length).toEqual(0)
      })
    })

    describe('when the entity is clicked', () => {
      beforeAll(() => {
        wrapper.simulate('click')
      })

      test('should not call the "onEntityClick" event', () => {
        expect(onEntityClickSpy.mock.calls.length).toEqual(0)
      })
    })
  })

  describe('when the "heading" prop was passed', () => {
    beforeAll(() => {
      wrapper = mount(<EntityListItem id="test" heading="test heading" />)
    })

    test('should display the heading', () => {
      expect(wrapper.find(H3).text()).toEqual('test heading')
    })
  })

  describe('when the "text" prop was passed', () => {
    beforeAll(() => {
      wrapper = mount(<EntityListItem id="test" text="test text" />)
      wrapper.update()
    })

    test('should display the inset text', () => {
      expect(enzymeFind(wrapper, InsetText).text()).toEqual('test text')
    })
  })

  describe('when the "meta" prop was passed', () => {
    const meta = [
      {
        label: 'some',
        value: 'meta',
      },
      {
        label: 'and',
        value: 'more meta',
      },
    ]

    beforeAll(() => {
      wrapper = mount(<EntityListItem id="test" meta={meta} />)
    })

    test('should render "Metadata" component', () => {
      const metaList = wrapper.find(Metadata)
      expect(metaList.prop('rows')).toEqual(meta)
    })
  })
})
