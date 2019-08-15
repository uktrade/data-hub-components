import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

import companySearchFixture from './fixtures/company-search'
import getEntities from './data-providers/DnbCompanySearch'
import EntitySearchWithDataProvider from './EntitySearchWithDataProvider'

const API_ENDPOINT = 'http://localhost:8000/v4/dnb/company-search'
const mock = new MockAdapter(axios)
mock.onPost(API_ENDPOINT).reply(200, companySearchFixture)

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

describe('EntitySearch', () => {
  describe('when initially loading the entity search component', () => {
    test('should render the component without entities', () => {
      const tree = renderer
        .create(<EntitySearchWithDataProvider getEntities={getEntities(API_ENDPOINT)} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the "Search" button has been clicked', () => {
    test('should render the component with entities', async () => {
      const wrapper = mount(<EntitySearchWithDataProvider
        getEntities={getEntities(API_ENDPOINT)}
      />)

      wrapper.find('Search').simulate('click')

      await tick()

      wrapper.update()

      expect(wrapper.debug()).toMatchSnapshot()
    })
  })
})
