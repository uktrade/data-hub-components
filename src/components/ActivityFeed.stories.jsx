import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'

import ActivityFeed from './ActivityFeed'
import activityFeedFixtures from '../../fixtures/activity_feed/'

addDecorator(withA11y)

storiesOf('ActivityFeed', module)
  .add('entire feed', () => <ActivityFeed activities={activityFeedFixtures} />)
