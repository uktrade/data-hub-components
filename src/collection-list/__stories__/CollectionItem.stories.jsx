import React from 'react'
import { storiesOf } from '@storybook/react'

import CollectionItem from '../CollectionItem'

import capitalProfileItem from '../__fixtures__/capitalProfileItem'
import interactionItem from '../__fixtures__/interactionItem'

const collectionStories = storiesOf('Collection', module)

collectionStories.add('Capital Profile item', () => (
  <CollectionItem {...capitalProfileItem} />
))

collectionStories.add('Interaction item', () => (
  <CollectionItem {...interactionItem} />
))
