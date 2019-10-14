import React from 'react'
import { mount } from 'enzyme'
import CollectionPagination from '../CollectionPagination'
import paginationProps from '../__fixtures__/paginationProps'

describe('CollectionPagination', () => {
  let wrapper

  describe('when 7 pages are passed and the current page is 3', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionPagination
          totalPages={paginationProps.totalPages}
          previous={paginationProps.previous}
          next={paginationProps.next}
          apiEndpoint={paginationProps.apiEndpoint}
          pageLimit={paginationProps.pageLimit}
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

    test('should render the truncated page link', () => {
      expect(wrapper.find('li span')).toHaveLength(1)
    })

    test('should render the current page link without href', () => {
      expect(wrapper.find('a').every('[href]')).toBe(false)
    })
  })

  describe('when 3 pages are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionPagination
          totalPages={3}
          previous="http://localhost:8000/v4/large-investor-profile?limit=10"
          next="http://localhost:8000/v4/large-investor-profile?limit=10&offset=20"
          apiEndpoint="http://localhost:8000/v4/large-investor-profile?limit=10"
          pageLimit={10}
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
      expect(wrapper.find('a').every('[href]')).toBe(false)
    })
  })

  describe('when just 1 page is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionPagination
          totalPages={1}
          previous={null}
          next={null}
          apiEndpoint="http://localhost:8000/v4/large-investor-profile?limit=10"
          pageLimit={10}
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
          previous={null}
          next="http://localhost:8000/v4/large-investor-profile?limit=10&offset=10"
          apiEndpoint="http://localhost:8000/v4/large-investor-profile?limit=10"
          pageLimit={10}
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
          previous="http://localhost:8000/v4/large-investor-profile?limit=10"
          next={null}
          apiEndpoint="http://localhost:8000/v4/large-investor-profile?limit=10"
          pageLimit={10}
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

  describe('when 1000 pages are passed and the current page is 99', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionPagination
          totalPages={1000}
          previous="http://localhost:8000/v4/large-investor-profile?limit=10&offset=980"
          next="http://localhost:8000/v4/large-investor-profile?limit=10&offset=990"
          apiEndpoint="http://localhost:8000/v4/large-investor-profile?limit=10"
          pageLimit={10}
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

    test('should render all the page links (including two truncated ones)', () => {
      expect(wrapper.find('li')).toHaveLength(8)
    })

    test('should render two truncated page links', () => {
      expect(wrapper.find('li span')).toHaveLength(2)
    })

    test('should render the current page link without href', () => {
      expect(wrapper.find('a').every('[href]')).toBe(false)
    })
  })

  describe('when 1000 pages are passed and the current page is 999', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionPagination
          totalPages={1000}
          previous="http://localhost:8000/v4/large-investor-profile?limit=10&offset=9980"
          next="http://localhost:8000/v4/large-investor-profile?limit=10&offset=9990"
          apiEndpoint="http://localhost:8000/v4/large-investor-profile?limit=10"
          pageLimit={10}
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

    test('should render one truncated page link', () => {
      expect(wrapper.find('li span')).toHaveLength(1)
    })

    test('should render the current page link without href', () => {
      expect(wrapper.find('a').every('[href]')).toBe(false)
    })
  })
})
