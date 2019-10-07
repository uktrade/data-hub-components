import React from 'react'
import PropTypes from 'prop-types'
import { SPACING } from '@govuk-react/constants'
import styled from 'styled-components'
import EntityList from './EntityList'

const StyledFiltersContainer = styled('div')`
  margin: ${SPACING.SCALE_2} 0 ${SPACING.SCALE_4} 0;
`

const EntitySearch = ({
  entityListHeader,
  entityListFooter,
  entities,
  onEntityClick,
  error,
  children,
}) => {
  return (
    <>
      <StyledFiltersContainer>{children}</StyledFiltersContainer>

      {entities && entities.length > 0 && (
        <>
          {entityListHeader}

          <EntityList entities={entities} onEntityClick={onEntityClick} />

          {entityListFooter}
        </>
      )}

      {entities && entities.length === 0 && (
        <p>There are no entities to show.</p>
      )}

      {error && <p>{error}</p>}
    </>
  )
}

EntitySearch.propTypes = {
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      meta: PropTypes.object.isRequired,
    })
  ),
  entityListHeader: PropTypes.node,
  entityListFooter: PropTypes.node,
  onEntityClick: PropTypes.func.isRequired,
  error: PropTypes.string,
  children: PropTypes.node,
}

EntitySearch.defaultProps = {
  entities: null,
  entityListHeader: null,
  entityListFooter: null,
  error: null,
  children: null,
}

export default EntitySearch
