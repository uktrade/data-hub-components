import React from 'react'
import { storiesOf } from '@storybook/react'

import Panel from '../Panel'
import NewWindowLink from '../../new-window-link/NewWindowLink'

const panelStories = storiesOf('Panel', module)

panelStories.add('Default', () => (
  <Panel title="How do referrals work?">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua{' '}
      <NewWindowLink href="/">Read more</NewWindowLink>
    </p>
  </Panel>
))
