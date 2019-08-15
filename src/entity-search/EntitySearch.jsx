import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

import EntityList from './EntityList'

const StyledButton = styled(Button)`
  margin-top: ${SPACING.SCALE_2};
`
StyledButton.displayName = 'Search'

const EntitySearch = ({ onEntitySearch, entities }) => {
  return (
    <>
      {entities && entities.length ? (
        <EntityList entities={entities} />
      ) : null}

      <StyledButton onClick={onEntitySearch}>Search</StyledButton>
    </>
  )
}

EntitySearch.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
  })).isRequired,
  onEntitySearch: PropTypes.func.isRequired,
}

export default EntitySearch
