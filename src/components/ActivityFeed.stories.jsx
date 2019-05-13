import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'

import { Main, GridRow, GridCol } from 'govuk-react'

import ActivityFeed from './ActivityFeed'
import activityFeedFixtures from '../../fixtures/activity_feed/'

addDecorator(withA11y)

storiesOf('ActivityFeed', module)
  .add('Entire feed', () => <ActivityFeed activities={activityFeedFixtures} />)
  .add('Data Hub company page', () => {
    return <Main>
      <GridRow>
        <GridCol>
          <img src="images/data-hub-one-list-corp.png" width="960" />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <ActivityFeed activities={activityFeedFixtures} />
        </GridCol>
      </GridRow>
    </Main>
  })