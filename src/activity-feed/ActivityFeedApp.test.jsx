import React from 'react'
import renderer from 'react-test-renderer'
import nock from 'nock'

import ActivityFeedApp from './ActivityFeedApp'
import esResults from '../../fixtures/activity_feed/activity-feed-from-es'

describe('ActivityFeedApp', () => {
  test('fetches activity feed', async (done) => {
    const companyId = '0f5216e0-849f-11e6-ae22-56b6b6499611'
    const addContentLink = `/companies/${companyId}/interactions/create`
    const apiBaseUrl = 'http://nock:3000'
    const apiPath = `/companies/${companyId}/activity-feed/data`
    const apiEndpoint = apiBaseUrl + apiPath

    nock(apiBaseUrl)
      .get(/companies.*$/)
      .reply(200, esResults)

    renderer.create(
      <ActivityFeedApp
        addContentText="Add interaction"
        addContentLink={addContentLink}
        apiEndpoint={apiEndpoint}
        render={(state) => {
          if (state.error) {
            throw Error('Exception raised.')
          }
          if (!state.isLoading) {
            expect(state).toMatchSnapshot()
            done()
          }
        }}
      />,
    )
  })
})
