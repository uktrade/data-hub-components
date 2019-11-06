import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import CollectionList from '../CollectionList'

import { DEFAULT_ITEMS_PER_PAGE } from '../constants'
import profilesFixture from '../__fixtures__/capitalProfiles'

const collectionStories = storiesOf('Collection', module)

const CollectionWithState = () => {
  const [activePage, setActivePage] = useState(1)

  const index = activePage - 1
  const offset = index * DEFAULT_ITEMS_PER_PAGE
  const limit = (index + 1) * DEFAULT_ITEMS_PER_PAGE

  const items = profilesFixture.slice(offset, limit)

  return (
    <CollectionList
      items={items}
      onPageClick={(page, event) => {
        setActivePage(page)
        event.preventDefault()
      }}
      activePage={activePage}
      totalItems={profilesFixture.length}
      itemName="profile"
      addItemUrl="http://example.com"
      downloadUrl="http://example.com"
    />
  )
}

collectionStories.add('Collection List', () => <CollectionWithState />)
