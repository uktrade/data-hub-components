import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  capitalProfileItem,
  interactionItem,
  capitalProfileHeading,
  paginationProps,
  capitalProfileCollectionList1,
} from '../__fixtures__'
import CollectionItem from '../CollectionItem'
import CollectionHeader from '../CollectionHeader'
import CollectionDownload from '../CollectionDownload'
import CollectionPagination from '../CollectionPagination'
import CollectionList from '../CollectionList'

storiesOf('Collection', module).add('Collection', () => (
  <CollectionList
    totalItems={capitalProfileCollectionList1.totalItems}
    itemName={capitalProfileCollectionList1.itemName}
    addItemUrl={capitalProfileCollectionList1.addItemUrl}
    downloadUrl={capitalProfileCollectionList1.downloadUrl}
    profiles={capitalProfileCollectionList1.profiles}
    previous={capitalProfileCollectionList1.previous}
    next={capitalProfileCollectionList1.next}
    apiEndpoint={capitalProfileCollectionList1.apiEndpoint}
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

storiesOf('Collection', module).add('Collection pagination', () => (
  <CollectionPagination
    totalPages={paginationProps.totalPages}
    previous={paginationProps.previous}
    next={paginationProps.next}
    apiEndpoint={paginationProps.apiEndpoint}
    pageLimit={paginationProps.pageLimit}
  />
))
