import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

import CannotFindDetails from './CannotFindDetails'
import EntityList from './EntityList'
import EntityFilters from './EntityFilters'
import PreviouslySelected from './PreviouslySelected'
import useFilter from './useFilter'

const StyledButton = styled(Button)`
  margin-top: ${SPACING.SCALE_2};
`
StyledButton.displayName = 'Search'

const EntitySearch = ({
  previouslySelected,
  entityFilters,
  onEntitySearch,
  entities,
  cannotFind,
  onEntityClick,
  error,
}) => {
  const { filters, setFilter } = useFilter()
  return (
    <>
      {previouslySelected && <PreviouslySelected {...previouslySelected} />}

      <EntityFilters entityFilters={entityFilters} setFilter={setFilter} />

      {entities && entities.length ? (
        <>
          <EntityList entities={entities} onEntityClick={onEntityClick} />
          <CannotFindDetails {...cannotFind} />
        </>
      ) : null}

      {error && <p>{error}</p>}

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
  cannotFind: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string,
      onClick: PropTypes.func,
    }).isRequired,
  }).isRequired,
  previouslySelected: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onChangeClick: PropTypes.func.isRequired,
  }),
  onEntityClick: PropTypes.func.isRequired,
  error: PropTypes.string,
}

EntitySearch.defaultProps = {
  previouslySelected: null,
  error: null,
}

export default EntitySearch
