import React from 'react'
import { mount } from 'enzyme'
import CollectionList from '../CollectionList'
import profilesFixture from '../__fixtures__/capitalProfiles.json'
import Pagination from '../../pagination/Pagination'
import CollectionHeader from '../CollectionHeader'
import CollectionItem from '../CollectionItem'
import CollectionDownload from '../CollectionDownload'

describe('CollectionList', () => {
  let wrapper
  const getPageUrl = (page) => `#page-${page}`
  const onPageClick = () => {}

  describe('when all props are passed', () => {
    const activePage = 2
    beforeAll(() => {
      wrapper = mount(
        <CollectionList
          items={profilesFixture}
          totalItems={profilesFixture.length}
          itemName="profile"
          addItemUrl="http://example.com"
          downloadUrl="http://example.com"
          getPageUrl={getPageUrl}
          onPageClick={onPageClick}
          activePage={activePage}
          itemsPerPage={10}
        />
      )
    })

    test('should render the list', () => {
      expect(wrapper.find(CollectionItem)).toHaveLength(12)
    })

    test('each item should have a unique key created', () => {
      wrapper.find(CollectionItem).forEach((item, index) => {
        expect(item.key()).toEqual(
          [profilesFixture.length, activePage, index].join('-')
        )
      })
    })

    test('should render the header', () => {
      const header = wrapper.find(CollectionHeader)
      expect(header.exists()).toBe(true)
      expect(header.props()).toEqual({
        addItemUrl: 'http://example.com',
        itemName: 'profile',
        totalItems: 12,
      })
    })

    test('should render the download section', () => {
      const download = wrapper.find(CollectionDownload)
      expect(download.exists()).toBe(true)
      expect(download.props()).toEqual({
        downloadUrl: 'http://example.com',
        itemName: 'profile',
        totalItems: 12,
      })
    })

    test('should render the pagination', () => {
      const pagination = wrapper.find(Pagination)
      expect(pagination.exists()).toBe(true)
      expect(pagination.props()).toMatchObject({
        totalPages: 2,
        activePage: 2,
        getPageUrl,
        onPageClick,
      })
    })
  })

  describe('when the "getPageUrl" prop is not passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionList
          items={profilesFixture}
          totalItems={profilesFixture.length}
          itemName="profile"
        />
      )
    })

    test('should use the default "getPageUrl" prop', () => {
      expect(wrapper.find(Pagination).prop('getPageUrl')).not.toBeNull()
    })
  })

  describe('when no items are passed', () => {
    beforeAll(() => {
      wrapper = mount(<CollectionList />)
    })

    test('should not render pagination', () => {
      expect(wrapper.find(Pagination).isEmptyRender()).toBe(true)
    })
  })
})
