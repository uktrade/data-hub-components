import React from 'react'
import PropTypes from 'prop-types'

import { CardHeader, CardHeading } from '../activity-feed/cards/card'
import {
  Item,
  ItemBadgeWrapper,
  ItemBadge,
  ItemMetaWrapper,
  ItemMeta,
} from './items'

function CollectionItem({
  itemId,
  basePath,
  subPath,
  headingText,
  badges,
  metadata,
}) {
  const headingUrl = subPath ? basePath + itemId + subPath : basePath + itemId

  return (
    <Item>
      <CardHeader>
        <CardHeading link={{ url: headingUrl, text: headingText }} />
        {badges && (
          <ItemBadgeWrapper>
            {badges.map((text) => (
              <ItemBadge key={text}>{text}</ItemBadge>
            ))}
          </ItemBadgeWrapper>
        )}
      </CardHeader>
      {metadata && (
        <ItemMetaWrapper>
          {metadata.map(({ label, value }) => (
            <ItemMeta key={label} label={label} value={value} />
          ))}
        </ItemMetaWrapper>
      )}
    </Item>
  )
}

CollectionItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  subPath: PropTypes.string,
  headingText: PropTypes.string.isRequired,
  badges: PropTypes.array,
  metadata: PropTypes.array,
}

CollectionItem.defaultProps = {
  badges: null,
  metadata: null,
  subPath: null,
}

export default CollectionItem
