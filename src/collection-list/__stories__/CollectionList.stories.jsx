import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  capitalProfileItem,
  interactionItem,
  capitalProfileHeading,
} from '../__fixtures__'
import CollectionItem from '../CollectionItem'
import CollectionHeader from '../CollectionHeader'
import CollectionDownload from '../CollectionDownload'

storiesOf('Collection', module).add('Collection', () => (
  <>
    <CollectionHeader
      totalItems={capitalProfileHeading.totalItems}
      itemName={capitalProfileHeading.itemName}
      addItemText={capitalProfileHeading.addItemText}
      addItemUrl={capitalProfileHeading.addItemUrl}
    />
    <CollectionDownload
      totalItems={capitalProfileHeading.totalItems}
      itemName={capitalProfileHeading.itemName}
      downloadUrl={capitalProfileHeading.downloadUrl}
    />
    <CollectionItem
      id={capitalProfileItem.id}
      headingUrl={capitalProfileItem.headerLink}
      headingText={capitalProfileItem.headerText}
      badges={capitalProfileItem.badges}
      metadata={capitalProfileItem.metadata}
    />
  </>
))

storiesOf('Collection', module).add('Collection Header', () => (
  <CollectionHeader
    totalItems={capitalProfileHeading.totalItems}
    itemName={capitalProfileHeading.itemName}
    addItemText={capitalProfileHeading.addItemText}
    addItemUrl={capitalProfileHeading.addItemUrl}
  />
))

storiesOf('Collection', module).add('Collection Download - no items', () => (
  <CollectionDownload
    totalItems={0}
    itemName={capitalProfileHeading.itemName}
    downloadUrl={null}
  />
))

storiesOf('Collection', module).add('Collection Download - 1 item', () => (
  <CollectionDownload
    totalItems={1}
    itemName={capitalProfileHeading.itemName}
    downloadUrl={null}
  />
))

storiesOf('Collection', module).add('Collection Download - 101 items', () => (
  <CollectionDownload
    totalItems={101}
    itemName={capitalProfileHeading.itemName}
    downloadUrl={null}
  />
))

storiesOf('Collection', module).add(
  'Collection Download - need to filter',
  () => (
    <CollectionDownload
      totalItems={5001}
      itemName={capitalProfileHeading.itemName}
      downloadUrl={capitalProfileHeading.downloadUrl}
    />
  )
)

storiesOf('Collection', module).add('Capital Profile item', () => (
  <CollectionItem
    id={capitalProfileItem.id}
    headingUrl={capitalProfileItem.headerUrl}
    headingText={capitalProfileItem.headerText}
    badges={capitalProfileItem.badges}
    metadata={capitalProfileItem.metadata}
  />
))

storiesOf('Collection', module).add('Collection Header', () => (
  <CollectionHeader
    totalItems={capitalProfileHeading.totalItems}
    itemName={capitalProfileHeading.itemName}
    addItemText={capitalProfileHeading.addItemText}
    addItemUrl={capitalProfileHeading.addItemUrl}
  />
))

storiesOf('Collection', module).add('Capital Profile item', () => (
  <CollectionItem
    id={capitalProfileItem.id}
    headingUrl={capitalProfileItem.headerUrl}
    headingText={capitalProfileItem.headerText}
    badges={capitalProfileItem.badges}
    metadata={capitalProfileItem.metadata}
  />
))

storiesOf('Collection', module).add('Interaction item', () => (
  <CollectionItem
    id={interactionItem.id}
    headingUrl={interactionItem.headerUrl}
    headingText={interactionItem.headerText}
    badges={interactionItem.badges}
    metadata={interactionItem.metadata}
  />
))
