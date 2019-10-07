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
              <ItemBadge>{text}</ItemBadge>
            ))}
          </ItemBadgeWrapper>
        )}
      </CardHeader>
      {metadata && (
        <ItemMetaWrapper>
          {metadata.map((data) => (
            <ItemMeta label={data.label} value={data.value} />
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
