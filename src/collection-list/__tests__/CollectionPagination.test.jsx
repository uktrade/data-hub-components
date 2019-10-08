import React from 'react'
import { mount } from 'enzyme'
import CollectionPagination from '../CollectionPagination'
import paginationProps from '../__fixtures__/paginationProps'

describe('CollectionPagination', () => {
  let wrapper

  describe('when 7 pages are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionPagination
          totalPages={paginationProps.totalPages}
          currentPage={paginationProps.currentPage}
          previous={paginationProps.previous}
          next={paginationProps.next}
          pages={paginationProps.pages}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionPagination).exists()).toBe(true)
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
      expect(wrapper.find('li')).toHaveLength(6)
    })

    test('should render the current page link without href', () => {
      expect(wrapper.find("a[href='#']")).toHaveLength(6)
    })
  })

  describe('when 3 pages are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionPagination
          totalPages={3}
          currentPage={2}
          previous="#"
          next="#"
          pages={[
            {
              label: '1',
              url: '#',
            },
            {
              label: '2',
              url: '#',
            },
            {
              label: '3',
              url: '#',
            },
          ]}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionPagination).exists()).toBe(true)
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
      expect(wrapper.find('li')).toHaveLength(3)
    })

    test('should render the current page link without href', () => {
      expect(wrapper.find("a[href='#']")).toHaveLength(4)
    })
  })

  describe('when just 1 page is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionPagination
          totalPages={1}
          currentPage={1}
          previous={null}
          next={null}
          pages={[
            {
              label: '1',
              url: '#',
            },
          ]}
        />
      )
    })

    test('should not render the component', () => {
      expect(wrapper.find('nav').exists()).toBe(false)
    })
  })

  describe('when 2 pages are passed and the current page is page 1', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionPagination
          totalPages={2}
          currentPage={1}
          previous={null}
          next="#"
          pages={[
            {
              label: '1',
              url: '#',
            },
            {
              label: '2',
              url: '#',
            },
          ]}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionPagination).exists()).toBe(true)
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

  describe('when 2 pages are passed and the current page is page 2', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionPagination
          totalPages={2}
          currentPage={2}
          previous="#"
          next={null}
          pages={[
            {
              label: '1',
              url: '#',
            },
            {
              label: '2',
              url: '#',
            },
          ]}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionPagination).exists()).toBe(true)
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
})
