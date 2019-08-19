import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING, FONT_SIZE, MEDIA_QUERIES } from '@govuk-react/constants'
import { GREY_2, GREY_4, LINK_COLOUR, LINK_HOVER_COLOUR, SECONDARY_TEXT_COLOUR } from 'govuk-colours'
import { uniqueId } from 'lodash'
import { H3 } from 'govuk-react'

const StyledEntityList = styled('ol')`
  margin: ${SPACING.SCALE_2} 0 ${SPACING.SCALE_4} 0;
  padding-left: 0;
`

const StyledEntityListItem = styled('li')`
  list-style-type: none;
`

const StyledEntity = styled('div')`
  margin-bottom: ${SPACING.SCALE_2};
  padding: ${SPACING.SCALE_2};
  border: 1px solid ${GREY_2};  
  cursor: pointer;
  
  &:hover {
    border: 1px solid ${LINK_HOVER_COLOUR};
    background-color: ${GREY_4};
    
    & > h3 {
      color: ${LINK_HOVER_COLOUR};
    }
  }
`
StyledEntity.displayName = 'StyledEntity'

const StyledHeading = styled(H3)`
  margin: 0;
  color: ${LINK_COLOUR};
  font-size: ${FONT_SIZE.SIZE_16};
  ${MEDIA_QUERIES.TABLET} {
    font-size: ${FONT_SIZE.SIZE_19};
  }
`

const StyledMetaItem = styled('div')`
  list-style-type: none;
  margin-top: ${SPACING.SCALE_2};
  font-size: ${FONT_SIZE.SIZE_16};
    
  & > span:nth-child(1) {
    color: ${SECONDARY_TEXT_COLOUR};
    margin-right: ${SPACING.SCALE_1}
  }
`

const EntityList = ({ entities, onEntityClick }) => {
  return (
    <StyledEntityList>
      {entities.map((entity) => {
        return (
          <StyledEntityListItem key={uniqueId()}>
            <StyledEntity key={uniqueId()} onClick={() => onEntityClick(entity)}>
              <StyledHeading>{entity.heading}</StyledHeading>
              {Object.keys(entity.meta).map(metaKey => (
                <StyledMetaItem key={uniqueId()}>
                  <span>{metaKey}:</span>
                  <span>{entity.meta[metaKey]}</span>
                </StyledMetaItem>
              ))}
            </StyledEntity>
          </StyledEntityListItem>
        )
      })}
    </StyledEntityList>
  )
}

EntityList.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
  })).isRequired,
  onEntityClick: PropTypes.func.isRequired,
}

export default EntityList
