import React from 'react'
import { storiesOf } from '@storybook/react'

import ActivityFeed from './activity-feed'
import fixtureInteraction from '../../../fixtures/activity_feed/interactions/interaction'
import fixtureInvestmentProject from '../../../fixtures/activity_feed/interactions/investment_project'

storiesOf('ActivityFeed', module)
  .add('entire feed', () => <ActivityFeed activities={[fixtureInteraction, fixtureInvestmentProject]} />)
