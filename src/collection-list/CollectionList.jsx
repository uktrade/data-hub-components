/* eslint-disable react/no-array-index-key */
// this is because there isn't necessarily a unique id to use as the key

import React from 'react'
import PropTypes from 'prop-types'

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
  itemsPerPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

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
        (
          { headingText, headingUrl, subheading, badges, metadata, type },
          index
        ) => (
          <CollectionItem
            key={index}
            headingUrl={headingUrl}
            headingText={headingText}
            subheading={subheading}
            badges={badges}
            metadata={metadata}
            type={type}
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
  itemsPerPage: PropTypes.number,
}

CollectionList.defaultProps = {
  addItemUrl: null,
  downloadUrl: null,
  items: null,
  onPageClick: null,
  getPageUrl: (page) => `#page-${page}`,
  activePage: 1,
  itemsPerPage: 10,
}

export default CollectionList
