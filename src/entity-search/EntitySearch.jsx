import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

import EntityList from './EntityList'
import EntityFilters from './EntityFilters'
import useFilter from './useFilter'

const StyledButton = styled(Button)`
  margin-top: ${SPACING.SCALE_2};
`
StyledButton.displayName = 'Search'

const EntitySearch = ({ onEntitySearch, entities, entityFilters }) => {
  const { filters, setFilter } = useFilter()

  return (
    <>
      <EntityFilters entityFilters={entityFilters} setFilter={setFilter} />

      {entities && entities.length ? (
        <EntityList entities={entities} />
      ) : null}

      <StyledButton onClick={() => onEntitySearch(filters)}>Search</StyledButton>
    </>
  )
}

EntitySearch.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
  })).isRequired,
  onEntitySearch: PropTypes.func.isRequired,
  entityFilters: PropTypes.array.isRequired,
}

export default EntitySearch
