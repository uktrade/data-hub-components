import React from 'react'
import { mount } from 'enzyme'
import CollectionDownload from '../CollectionDownload'
import capitalProfileHeading from '../__fixtures__/capitalProfileHeading'

describe('CollectionDownload', () => {
  let wrapper

  describe('when no items are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionDownload
          totalItems={0}
          itemName={capitalProfileHeading.itemName}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionDownload).exists()).toBe(true)
    })

    test('should render the NoItemsText', () => {
      expect(wrapper.find('p').text()).toBe('There are no profiles to download')
    })

    test('should not render the download button', () => {
      expect(wrapper.find('button').exists()).toBe(false)
    })
  })

  describe('when 1 item is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionDownload
          totalItems={1}
          itemName={capitalProfileHeading.itemName}
          downloadUrl={capitalProfileHeading.downloadUrl}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionDownload).exists()).toBe(true)
    })

    test('should render the DownloadText', () => {
      expect(wrapper.find('p').text()).toBe('You can download this profile')
    })

    test('should render the download button', () => {
      expect(wrapper.find('button').exists()).toBe(true)
    })
  })

  describe('when more than 5000 items are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionDownload
          totalItems={5001}
          itemName={capitalProfileHeading.itemName}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionDownload).exists()).toBe(true)
    })

    test('should render the NeedToFilterText', () => {
      expect(wrapper.find('p').text()).toBe(
        'Filter to fewer than 5000 profiles to download'
      )
    })

    test('should not render the download button', () => {
      expect(wrapper.find('button').exists()).toBe(false)
    })
  })
})
