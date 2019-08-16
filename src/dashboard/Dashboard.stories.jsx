import React from 'react'
import { storiesOf } from '@storybook/react'

import Dashboard from './Dashboard'

const companies = [
  { companyId: '123', companyName: 'some LTD' },
  { companyId: '456', companyName: 'some PLC' },
]


storiesOf('Dashboard', module)
  .add('Simple dashboard', () => (
    <Dashboard tiles={[
      {
        name: 'my-companies',
        data: companies,
      },
    ]}
    />
  ))
