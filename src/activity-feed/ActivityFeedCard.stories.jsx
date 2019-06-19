import React from 'react'
import { storiesOf } from '@storybook/react'

import ActivityFeedCard from './ActivityFeedCard'
import fixtureInteraction from '../../fixtures/activity_feed/interactions/interaction'
import fixtureInvestmentProject from '../../fixtures/activity_feed/interactions/investment_project'
import foreignDirectInvestment from '../../fixtures/activity_feed/investment_projects/project_added_fdi'
import nonCommitmentToInvest from '../../fixtures/activity_feed/investment_projects/project_added_non_fdi'
import commitmentToInvest from '../../fixtures/activity_feed/investment_projects/project_added_cti'
import omisAdd from '../../fixtures/activity_feed/omis/omis-add'

storiesOf('ActivityFeedCard', module)
  .add('interaction', () => <ActivityFeedCard activity={fixtureInteraction} />)
  .add('investment project - interaction', () => <ActivityFeedCard activity={fixtureInvestmentProject} />)
  .add('investment project added - FDI', () => <ActivityFeedCard activity={foreignDirectInvestment} />)
  .add('investment project added - Non-FDI', () => <ActivityFeedCard activity={nonCommitmentToInvest} />)
  .add('investment project added - CTI', () => <ActivityFeedCard activity={commitmentToInvest} />)
  .add('OMIS - Add', () => <ActivityFeedCard activity={omisAdd} />)
