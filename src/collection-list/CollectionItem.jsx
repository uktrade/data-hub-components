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

function CollectionItem({ headingUrl, headingText, badges, metadata }) {
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
  headingUrl: PropTypes.string.isRequired,
  headingText: PropTypes.string.isRequired,
  badges: PropTypes.array,
  metadata: PropTypes.array,
}

CollectionItem.defaultProps = {
  badges: null,
  metadata: null,
}

export default CollectionItem
