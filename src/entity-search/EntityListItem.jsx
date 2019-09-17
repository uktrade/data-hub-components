import React from 'react'
import styled from 'styled-components'
import { FOCUSABLE, FONT_SIZE, MEDIA_QUERIES, SPACING } from '@govuk-react/constants'
import { GREY_2, GREY_4, LINK_COLOUR, LINK_HOVER_COLOUR } from 'govuk-colours'
import { H3 } from '@govuk-react/heading'
import InsetText from '@govuk-react/inset-text'
import PropTypes from 'prop-types'

import { isEmpty } from 'lodash'

import EntityListItemMetaList from './EntityListItemMetaList'

const StyledEntity = styled('div')`
  margin-bottom: ${SPACING.SCALE_2};
  padding: ${SPACING.SCALE_2};
  border: 1px solid ${GREY_2};
  ${FOCUSABLE};
  
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

const EntityListItem = ({
  id,
  canHandleClick,
  onEntityClick,
  data,
  text,
  heading,
  meta,
}) => {
  return (
    <StyledEntity
      key={`entity_${id}`}
      tabIndex={canHandleClick ? 0 : undefined}
      onClick={() => canHandleClick && onEntityClick(data)}
      onKeyDown={e => canHandleClick && e.keyCode === 13 && onEntityClick(data)}
      canHandleClick={canHandleClick}
    >
      {heading && <StyledHeading>{heading}</StyledHeading>}

      {!isEmpty(meta) && <EntityListItemMetaList meta={meta} />}

      {text && <StyledInsetText>{text}</StyledInsetText>}
    </StyledEntity>
  )
}

EntityListItem.propTypes = {
  id: PropTypes.string.isRequired,
  canHandleClick: PropTypes.bool,
  onEntityClick: PropTypes.func,
  data: PropTypes.shape({}),
  text: PropTypes.node,
  heading: PropTypes.string,
  meta: PropTypes.shape({}),
}

EntityListItem.defaultProps = {
  text: null,
  canHandleClick: false,
  onEntityClick: null,
  data: {},
  heading: null,
  meta: null,
}

export default EntityListItem
