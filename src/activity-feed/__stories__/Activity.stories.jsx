import React from 'react'
import { storiesOf } from '@storybook/react'

import Activity from '../Activity'
import fixtureInteraction from '../__fixtures__/interactions/interaction'
import fixtureInvestmentProject from '../__fixtures__/interactions/investment_project'
import foreignDirectInvestment from '../__fixtures__/investment_projects/project_added_fdi'
import nonCommitmentToInvest from '../__fixtures__/investment_projects/project_added_non_fdi'
import commitmentToInvest from '../__fixtures__/investment_projects/project_added_cti'
import orderAdded from '../__fixtures__/omis/order_added'

storiesOf('Activity', module)
  .add('interaction', () => <Activity activity={fixtureInteraction} />)
  .add('investment project - interaction', () => <Activity activity={fixtureInvestmentProject} />)
  .add('investment project added - FDI', () => <Activity activity={foreignDirectInvestment} />)
  .add('investment project added - Non-FDI', () => <Activity activity={nonCommitmentToInvest} />)
  .add('investment project added - CTI', () => <Activity activity={commitmentToInvest} />)
  .add('omis - new order added', () => <Activity activity={orderAdded} />)
