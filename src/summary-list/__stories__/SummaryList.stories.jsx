import React from 'react'
import { storiesOf } from '@storybook/react'

import SummaryList from '../SummaryList'

const stories = storiesOf('SummaryList', module)

const rows = [
  { label: 'Registered company name', value: 'Example Ltd' },
  { label: 'Trading name(s)', value: 'Examples & Tests' },
  {
    label: 'Located at',
    value: '99 Foo Street, London, SE1 456, United Kingdom',
  },
  {
    label: 'Registered address',
    value: '123 Fake Road, London, SE1 123, United Kingdom',
  },
]

stories.add('Default', () => <SummaryList rows={rows} />)
