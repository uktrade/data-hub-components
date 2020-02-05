import React from 'react'
import { mount } from 'enzyme/build'
import Pagination from '../Pagination'

describe('Pagination', () => {
  let wrapper

  describe('when 7 pages are passed and the active page is 3', () => {
    beforeAll(() => {
      wrapper = mount(<Pagination activePage={3} totalPages={7} />)
    })

    test('should render the previous button', () => {
      expect(
        wrapper
          .find('a')
          .first()
          .text()
      ).toBe('Previous')
    })

    test('should render the next button', () => {
      expect(
        wrapper
          .find('a')
          .last()
          .text()
      ).toBe('Next')
    })

    test('should render all the pagination pieces', () => {
      expect(wrapper.find('li')).toHaveLength(9)
    })

    test('should render the truncated page link', () => {
      expect(wrapper.find('li span')).toHaveLength(1)
    })

    test('should render the active page', () => {
      expect(wrapper.find('a[data-test="page-number-active"]').text()).toEqual(
        '3'
      )
    })
  })

  describe('when 3 pages are passed and the active page is 2', () => {
    beforeAll(() => {
      wrapper = mount(<Pagination activePage={2} totalPages={3} />)
    })

    test('should render the previous button', () => {
      expect(
        wrapper
          .find('a')
          .first()
          .text()
      ).toBe('Previous')
    })

    test('should render the next button', () => {
      expect(
        wrapper
          .find('a')
          .last()
          .text()
      ).toBe('Next')
    })

    test('should render all the pagination pieces', () => {
      expect(wrapper.find('li')).toHaveLength(5)
    })

    test('should render the active page', () => {
      expect(wrapper.find('a[data-test="page-number-active"]').text()).toEqual(
        '2'
      )
    })
  })

  describe('when just 1 page is passed', () => {
    beforeAll(() => {
      wrapper = mount(<Pagination totalPages={1} />)
    })

    test('should not render the component', () => {
      expect(wrapper.find('nav').exists()).toBe(false)
    })
  })

  describe('when 2 pages are passed and the active page is page 1', () => {
    beforeAll(() => {
      wrapper = mount(<Pagination totalPages={2} activePage={1} />)
    })

    test('should not render the previous button', () => {
      expect(wrapper.findWhere((a) => a.text() === 'Previous')).toHaveLength(0)
    })

    test('should render the next button', () => {
      expect(
        wrapper
          .find('a')
          .last()
          .text()
      ).toBe('Next')
    })
  })

  describe('when 2 pages are passed and the active page is page 2', () => {
    beforeAll(() => {
      wrapper = mount(<Pagination totalPages={2} activePage={2} />)
    })

    test('should not render the next button', () => {
      expect(wrapper.findWhere((a) => a.text() === 'Next')).toHaveLength(0)
    })

    test('should render the previous button', () => {
      expect(
        wrapper
          .find('a')
          .first()
          .text()
      ).toBe('Previous')
    })
  })

  describe('when 1000 pages are passed and the active page is 99', () => {
    beforeAll(() => {
      wrapper = mount(<Pagination totalPages={1000} activePage={99} />)
    })

    test('should render the previous button', () => {
      expect(
        wrapper
          .find('a')
          .first()
          .text()
      ).toBe('Previous')
    })

    test('should render the next button', () => {
      expect(
        wrapper
          .find('a')
          .last()
          .text()
      ).toBe('Next')
    })

    test('should render all the page links (including two truncated ones)', () => {
      expect(wrapper.find('li')).toHaveLength(11)
    })

    test('should render two truncated page links', () => {
      expect(wrapper.find('li span[data-test="ellipsis"]')).toHaveLength(2)
    })

    test('should render the active page', () => {
      expect(wrapper.find('a[data-test="page-number-active"]').text()).toEqual(
        '99'
      )
    })
  })

  describe('when 1000 pages are passed and the active page is 999', () => {
    beforeAll(() => {
      wrapper = mount(<Pagination totalPages={1000} activePage={999} />)
    })

    test('should render the previous button', () => {
      expect(
        wrapper
          .find('a')
          .first()
          .text()
      ).toBe('Previous')
    })

    test('should render the next button', () => {
      expect(
        wrapper
          .find('a')
          .last()
          .text()
      ).toBe('Next')
    })

    test('should render all the page links', () => {
      expect(wrapper.find('li')).toHaveLength(9)
    })

    test('should render one truncated page link', () => {
      expect(wrapper.find('li span[data-test="ellipsis"]')).toHaveLength(1)
    })

    test('should render the active page', () => {
      expect(wrapper.find('a[data-test="page-number-active"]').text()).toEqual(
        '999'
      )
    })
  })

  describe('when there are 5 total pages', () => {
    beforeAll(() => {
      wrapper = mount(<Pagination totalPages={5} activePage={1} />)
    })

    test('should not render the ellipsis', () => {
      expect(wrapper.find('li span[data-test="ellipsis"]')).toHaveLength(0)
    })
  })
})
