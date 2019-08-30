import React from 'react'
import { storiesOf } from '@storybook/react'

import ActivityFeedCard from '../ActivityFeedCard'
import fixtureInteraction from '../__fixtures__/interactions/interaction'
import fixtureInvestmentProject from '../__fixtures__/interactions/investment_project'
import foreignDirectInvestment from '../__fixtures__/investment_projects/project_added_fdi'
import nonCommitmentToInvest from '../__fixtures__/investment_projects/project_added_non_fdi'
import commitmentToInvest from '../__fixtures__/investment_projects/project_added_cti'
import orderAdded from '../__fixtures__/omis/order_added'

storiesOf('ActivityFeedCard', module)
  .add('interaction', () => <ActivityFeedCard activity={fixtureInteraction} />)
  .add('investment project - interaction', () => <ActivityFeedCard activity={fixtureInvestmentProject} />)
  .add('investment project added - FDI', () => <ActivityFeedCard activity={foreignDirectInvestment} />)
  .add('investment project added - Non-FDI', () => <ActivityFeedCard activity={nonCommitmentToInvest} />)
  .add('investment project added - CTI', () => <ActivityFeedCard activity={commitmentToInvest} />)
  .add('omis - new order added', () => <ActivityFeedCard activity={orderAdded} />)
