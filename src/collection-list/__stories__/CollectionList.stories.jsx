import React from 'react'
import { storiesOf } from '@storybook/react'

import { largeCapitalProfileItem, interactionItem } from '../__fixtures__'
import CollectionItem from '../CollectionItem'

storiesOf('CollectionList', module)
  .add('Large Capital Profile item', () => (
    <CollectionItem
      id={largeCapitalProfileItem.id}
      headingUrl={largeCapitalProfileItem.headerUrl}
      headingText={largeCapitalProfileItem.headerText}
      badges={largeCapitalProfileItem.badges}
      metadata={largeCapitalProfileItem.metadata}
    />
  ))

storiesOf('CollectionList', module)
  .add('Interaction item', () => (
    <CollectionItem
      id={interactionItem.id}
      headingUrl={interactionItem.headerUrl}
      headingText={interactionItem.headerText}
      badges={interactionItem.badges}
      metadata={interactionItem.metadata}
    />
  ))
