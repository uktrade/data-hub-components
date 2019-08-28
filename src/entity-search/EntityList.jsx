import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { uniqueId } from 'lodash'

import EntityListItem from './EntityListItem'

const StyledEntityList = styled('ol')`
  margin-bottom: ${SPACING.SCALE_4};
  padding-left: 0;
`

const StyledEntityListItem = styled('li')`
  list-style-type: none;
`

const EntityList = ({ entities, onEntityClick }) => {
  return (
    <StyledEntityList>
      {entities.map((entity) => {
        return (
          <StyledEntityListItem key={uniqueId()}>
            <EntityListItem onEntityClick={onEntityClick} {...entity} />
          </StyledEntityListItem>
        )
      })}
    </StyledEntityList>
  )
}

EntityList.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object.isRequired,
    canHandleClick: PropTypes.bool.isRequired,
    text: PropTypes.node,
    heading: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
  })),
  onEntityClick: PropTypes.func.isRequired,
}

EntityList.defaultProps = {
  entities: null,
}

export default EntityList
