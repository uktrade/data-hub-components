import React from 'react'
import { storiesOf } from '@storybook/react'
import Paragraph from '@govuk-react/paragraph'

import DetailsText from '../DetailsText'

storiesOf('DetailsText', module)
  .add('with text', () => (
    <DetailsText>
      <Paragraph mb={0}>Mars&apos;s sector is **ICT**</Paragraph>
    </DetailsText>
  ))
