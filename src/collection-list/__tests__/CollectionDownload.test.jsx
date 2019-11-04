import React from 'react'
import { mount } from 'enzyme'
import CollectionDownload from '../CollectionDownload'

describe('CollectionDownload', () => {
  let wrapper

  describe('when no items are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionDownload totalItems={0} itemName="profile" downloadUrl="#" />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionDownload)).toHaveLength(1)
    })

    test('should render the no items to download message', () => {
      expect(wrapper.text()).toContain('There are no profiles to download')
    })

    test('should not render the download button', () => {
      expect(wrapper.find('button')).toHaveLength(0)
    })
  })

  describe('when the "downloadUrl" prop is empty', () => {
    beforeAll(() => {
      wrapper = mount(<CollectionDownload totalItems={0} itemName="profile" />)
    })

    test('should not render the component', () => {
      expect(wrapper.html()).toBeNull()
    })
  })

  describe('when 1 item is passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionDownload totalItems={1} itemName="profile" downloadUrl="#" />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionDownload)).toHaveLength(1)
    })

    test('should render the download message', () => {
      expect(wrapper.text()).toContain('You can now download 1 profile')
    })

    test('should render the download button', () => {
      expect(wrapper.find('button')).toHaveLength(1)
    })
  })

  describe('when more than 5000 items are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionDownload
          totalItems={5001}
          itemName="profile"
          downloadUrl="#"
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionDownload)).toHaveLength(1)
    })

    test('should render the need for filter message', () => {
      expect(wrapper.text()).toContain(
        'Filter to fewer than 5000 profiles to download'
      )
    })

    test('should not render the download button', () => {
      expect(wrapper.find('button')).toHaveLength(0)
    })
  })
})
