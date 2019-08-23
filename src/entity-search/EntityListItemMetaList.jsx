import { uniqueId } from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { FONT_SIZE, SPACING } from '@govuk-react/constants'
import { SECONDARY_TEXT_COLOUR } from 'govuk-colours'
import PropTypes from 'prop-types'

const StyledMetaItem = styled('div')`
  list-style-type: none;
  margin-top: ${SPACING.SCALE_2};
  font-size: ${FONT_SIZE.SIZE_16};
    
  & > span:nth-child(1) {
    color: ${SECONDARY_TEXT_COLOUR};
    margin-right: ${SPACING.SCALE_1};
  }
`

const EntityListItemMetaList = ({ meta }) => {
  return (
    Object.keys(meta).map(metaKey => (
      <StyledMetaItem key={uniqueId()}>
        <span>{metaKey}:</span>
        <span>{meta[metaKey]}</span>
      </StyledMetaItem>
    ))
  )
}

EntityListItemMetaList.propTypes = {
  meta: PropTypes.object.isRequired,
}

export default EntityListItemMetaList
