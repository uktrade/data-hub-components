import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { GREY_3, LINK_COLOUR, SECONDARY_TEXT_COLOUR } from 'govuk-colours'
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
  margin-bottom: ${SPACING.SCALE_1};
  padding: ${SPACING.SCALE_2};
  border: 1px solid ${GREY_3};  
  cursor: pointer;
`

const StyledHeading = styled(H3)`
  margin: 0;
  color: ${LINK_COLOUR};
`

const StyledMetaItem = styled('div')`
  list-style-type: none;
  margin-top: ${SPACING.SCALE_2};
  
  & > span:nth-child(1) {
    color: ${SECONDARY_TEXT_COLOUR};
  }
`

const EntityList = ({ entities }) => {
  return (
    <StyledEntityList>
      {entities.map(({ heading, meta }) => {
        return (
          <StyledEntityListItem key={uniqueId()}>
            <StyledEntity key={uniqueId()}>
              <StyledHeading>{heading}</StyledHeading>
              {Object.keys(meta).map((metaKey) => {
                return (
                  <StyledMetaItem key={uniqueId()}>
                    <span>{metaKey}:&nbsp;</span>
                    <span>{meta[metaKey]}</span>
                  </StyledMetaItem>
                )
              })}
            </StyledEntity>
          </StyledEntityListItem>
        )
      })}
    </StyledEntityList>
  )
}

EntityList.propTypes = {
  entities: PropTypes.array.isRequired,
}

export default EntityList
