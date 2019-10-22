import React from 'react'
import { mount } from 'enzyme'
import LoadingBox from '@govuk-react/loading-box'
import CollectionList from '../CollectionList'
import capitalProfileCollectionList1 from '../__fixtures__/capitalProfileCollectionList1'

describe('CollectionItem', () => {
  let wrapper

  describe('when all props are passed', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionList
          totalItems={capitalProfileCollectionList1.totalItems}
          itemName={capitalProfileCollectionList1.itemName}
          addItemUrl={capitalProfileCollectionList1.addItemUrl}
          downloadUrl={capitalProfileCollectionList1.downloadUrl}
          profiles={capitalProfileCollectionList1.profiles}
          previous={capitalProfileCollectionList1.previous}
          next={capitalProfileCollectionList1.next}
          apiEndpoint={capitalProfileCollectionList1.apiEndpoint}
          basePath={capitalProfileCollectionList1.basePath}
          subPath={capitalProfileCollectionList1.subPath}
          isLoading={false}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionList).exists()).toBe(true)
    })

    test('the loading spinner is not displayed', () => {
      const loader = wrapper.find(LoadingBox)
      expect(loader.prop('loading')).toBe(false)
    })
  })

  describe('when the apiEndpoint does not contain a limit', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionList
          totalItems={capitalProfileCollectionList1.totalItems}
          itemName={capitalProfileCollectionList1.itemName}
          addItemUrl={capitalProfileCollectionList1.addItemUrl}
          downloadUrl={capitalProfileCollectionList1.downloadUrl}
          profiles={capitalProfileCollectionList1.profiles}
          previous={capitalProfileCollectionList1.previous}
          next={capitalProfileCollectionList1.next}
          apiEndpoint="http://localhost:8000/v4/large-investor-profile"
          basePath={capitalProfileCollectionList1.basePath}
          subPath={capitalProfileCollectionList1.subPath}
          isLoading={false}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionList).exists()).toBe(true)
    })

    test('the page limit should default to 10', () => {
      expect(wrapper.find('h3')).toHaveLength(10)
    })

    test('the loading spinner is not displayed', () => {
      const loader = wrapper.find(LoadingBox)
      expect(loader.prop('loading')).toBe(false)
    })
  })

  describe('when isLoading is set to true', () => {
    beforeAll(() => {
      wrapper = mount(
        <CollectionList
          totalItems={capitalProfileCollectionList1.totalItems}
          itemName={capitalProfileCollectionList1.itemName}
          addItemUrl={capitalProfileCollectionList1.addItemUrl}
          downloadUrl={capitalProfileCollectionList1.downloadUrl}
          profiles={capitalProfileCollectionList1.profiles}
          previous={capitalProfileCollectionList1.previous}
          next={capitalProfileCollectionList1.next}
          apiEndpoint="http://localhost:8000/v4/large-investor-profile"
          basePath={capitalProfileCollectionList1.basePath}
          subPath={capitalProfileCollectionList1.subPath}
          isLoading={true}
        />
      )
    })

    test('should render the component', () => {
      expect(wrapper.find(CollectionList).exists()).toBe(true)
    })

    test('the loading spinner is displayed', () => {
      const loader = wrapper.find(LoadingBox)
      expect(loader.prop('loading')).toBe(true)
    })
  })
})
