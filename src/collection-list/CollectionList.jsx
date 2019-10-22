import React from 'react'
import PropTypes from 'prop-types'

import getNumberParam from './getNumberParam'

import {
  CollectionHeader,
  CollectionDownload,
  CollectionItem,
  CollectionPagination,
} from '.'

function CollectionList({
  totalItems,
  itemName,
  addItemUrl,
  downloadUrl,
  previous,
  next,
  profiles,
  apiEndpoint,
}) {
  const pageLimit = getNumberParam(apiEndpoint, 'limit=')

  const totalPages = Math.floor(totalItems / pageLimit) + 1

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
      {profiles
        .slice(0, pageLimit)
        .map(({ companyId, headingUrl, headingText, badges, metadata }) => (
          <CollectionItem
            key={companyId}
            headingUrl={headingUrl}
            headingText={headingText}
            badges={badges}
            metadata={metadata}
          />
        ))}
      <CollectionPagination
        totalPages={totalPages}
        previous={previous}
        next={next}
        apiEndpoint={apiEndpoint}
        pageLimit={pageLimit}
      />
    </>
  )
}

CollectionList.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  addItemUrl: PropTypes.string,
  downloadUrl: PropTypes.string,
  profiles: PropTypes.array,
  previous: PropTypes.string,
  next: PropTypes.string,
  apiEndpoint: PropTypes.string.isRequired,
}

CollectionList.defaultProps = {
  addItemUrl: null,
  downloadUrl: null,
  profiles: null,
  previous: null,
  next: null,
}

export default CollectionList
