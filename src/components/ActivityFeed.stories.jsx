import React from 'react'
import { storiesOf } from '@storybook/react'

import ActivityFeed from './ActivityFeed'
import activityFeedFixtures from '../../fixtures/activity_feed/'

storiesOf('ActivityFeed', module)
  .add('entire feed', () => <ActivityFeed activities={activityFeedFixtures} />)
