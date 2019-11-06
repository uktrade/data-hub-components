import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { H3 } from '@govuk-react/heading'
import Link from '@govuk-react/link'
import { HEADING_SIZES, SPACING } from '@govuk-react/constants'
import { GREY_2 } from 'govuk-colours'

import Metadata from '../metadata/Metadata'
import Badge from '../badge/Badge'

const ItemWrapper = styled('div')`
  border-bottom: 1px solid ${GREY_2};
  padding: ${SPACING.SCALE_3} 0;
`

const StyledBadgesWrapper = styled('div')`
  float: right;
  & > * {
    margin-right: ${SPACING.SCALE_1};
    &:last-child {
      margin-right: 0;
    }
  }
`

const StyledHeader = styled(H3)`
  font-size: ${HEADING_SIZES.SMALL}px;

  & > a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
  }
`

const StyledSubheading = styled('h4')`
  font-size: 14px;
  line-height: 20px;
  color: #6f777b;
  font-weight: normal;
  margin: -${SPACING.SCALE_3} 0 ${SPACING.SCALE_2} 0;
`

function CollectionItem({
  headingUrl,
  headingText,
  subheading,
  badges,
  metadata,
}) {
  return (
    <ItemWrapper>
      {badges && (
        <StyledBadgesWrapper>
          {badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </StyledBadgesWrapper>
      )}

      <StyledHeader>
        <Link href={headingUrl}>{headingText}</Link>
      </StyledHeader>

      <StyledSubheading>{subheading}</StyledSubheading>

      <Metadata rows={metadata} />
    </ItemWrapper>
  )
}

CollectionItem.propTypes = {
  headingUrl: PropTypes.string,
  headingText: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  badges: PropTypes.arrayOf(PropTypes.string),
  metadata: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
    })
  ),
}

CollectionItem.defaultProps = {
  badges: null,
  subheading: null,
  metadata: null,
  headingUrl: null,
}

export default CollectionItem
