import React from 'react'
import PropTypes from 'prop-types'

import { DEFAULT_ITEMS_PER_PAGE } from './constants'
import Pagination from '../pagination/Pagination'
import CollectionHeader from './CollectionHeader'
import CollectionDownload from './CollectionDownload'
import CollectionItem from './CollectionItem'

function CollectionList({
  totalItems,
  itemName,
  addItemUrl,
  downloadUrl,
  items,
  onPageClick,
  getPageUrl,
  activePage,
}) {
  const totalPages = Math.floor(totalItems / DEFAULT_ITEMS_PER_PAGE) + 1

  return (
    <>
      <CollectionHeader
        totalItems={totalItems}
        itemName={itemName}
        addItemUrl={addItemUrl}
      />

      <CollectionDownload
        totalItems={totalItems}
        itemName={itemName}
        downloadUrl={downloadUrl}
      />

      {items.map(
        ({ headingText, headingUrl, subheading, badges, metadata }) => (
          <CollectionItem
            key={headingText + headingUrl}
            headingUrl={headingUrl}
            headingText={headingText}
            subheading={subheading}
            badges={badges}
            metadata={metadata}
          />
        )
      )}

      <Pagination
        totalPages={totalPages}
        activePage={activePage}
        onPageClick={onPageClick}
        getPageUrl={getPageUrl}
      />
    </>
  )
}

CollectionList.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  addItemUrl: PropTypes.string,
  downloadUrl: PropTypes.string,
  items: PropTypes.array,
  onPageClick: PropTypes.func,
  getPageUrl: PropTypes.func,
  activePage: PropTypes.number,
}

CollectionList.defaultProps = {
  addItemUrl: null,
  downloadUrl: null,
  items: null,
  onPageClick: null,
  getPageUrl: (page) => `#page-${page}`,
  activePage: 1,
}

export default CollectionList
