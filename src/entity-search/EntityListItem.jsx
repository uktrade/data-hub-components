import { uniqueId } from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { FONT_SIZE, MEDIA_QUERIES, SPACING } from '@govuk-react/constants'
import { GREY_2, GREY_4, LINK_COLOUR, LINK_HOVER_COLOUR } from 'govuk-colours'
import { H3, InsetText } from 'govuk-react'
import PropTypes from 'prop-types'

import EntityListItemMetaList from './EntityListItemMetaList'

const StyledEntity = styled('div')`
  margin-bottom: ${SPACING.SCALE_2};
  padding: ${SPACING.SCALE_2};
  border: 1px solid ${GREY_2};  
  
  ${({ canHandleClick }) => canHandleClick && `
    cursor: pointer;

    &:hover {
      border: 1px solid ${LINK_HOVER_COLOUR};
      background-color: ${GREY_4};
      
      & > h3 {
        color: ${LINK_HOVER_COLOUR};
      }
    }
  `}
`

const StyledHeading = styled(H3)`
  margin: 0;
  color: ${LINK_COLOUR};
  font-size: ${FONT_SIZE.SIZE_16};
  ${MEDIA_QUERIES.TABLET} {
    font-size: ${FONT_SIZE.SIZE_19};
  }
`

const StyledInsetText = styled(InsetText)`
  & {
    margin-top: ${SPACING.SCALE_2};
  }
`

const EntityListItem = ({ canHandleClick, onEntityClick, data, text, heading, meta }) => {
  return (
    <StyledEntity
      key={uniqueId()}
      onClick={() => (canHandleClick ? onEntityClick(data) : null)}
      canHandleClick={canHandleClick}
    >
      <StyledHeading>{heading}</StyledHeading>

      <EntityListItemMetaList meta={meta} />

      {text && <StyledInsetText>{text}</StyledInsetText>}
    </StyledEntity>
  )
}

EntityListItem.propTypes = {
  onEntityClick: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  canHandleClick: PropTypes.bool.isRequired,
  text: PropTypes.node,
  heading: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
}

EntityListItem.defaultProps = {
  text: null,
}

export default EntityListItem
