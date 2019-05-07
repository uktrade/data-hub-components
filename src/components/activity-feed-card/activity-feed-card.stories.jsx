import React from 'react'
import { storiesOf } from '@storybook/react'

import ActivityFeedCard from './activity-feed-card'
import fixtureInteraction from '../../../fixtures/activity_feed/interactions/interaction'
import fixtureInvestmentProject from '../../../fixtures/activity_feed/interactions/investment_project'

storiesOf('ActivityFeedCard', module)
  .add('interaction', () => <ActivityFeedCard activity={fixtureInteraction} />)
  .add('investment project', () => <ActivityFeedCard activity={fixtureInvestmentProject} />)
