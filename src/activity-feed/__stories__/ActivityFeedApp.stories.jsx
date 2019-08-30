import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import ActivityFeedApp from '../ActivityFeedApp'

addDecorator(withKnobs)

storiesOf('ActivityFeedApp', module)
  .add('DataHub App', () => {
    const companyId = '0f5216e0-849f-11e6-ae22-56b6b6499611'
    const apiEndpoint = text('apiEndpoint', `http://localhost:3000/companies/${companyId}/activity-feed/data`)

    return (
      <ActivityFeedApp
        addContentText="Add interaction"
        addContentLink={`/companies/${companyId}/interactions/create`}
        apiEndpoint={apiEndpoint}
      />
    )
  })
