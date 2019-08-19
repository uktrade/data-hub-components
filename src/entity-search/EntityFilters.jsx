import React from 'react'
import styled from 'styled-components'
import { GREY_3 } from 'govuk-colours'
import { SPACING } from '@govuk-react/constants'
import PropTypes from 'prop-types'
import { uniqueId } from 'lodash'

import EntityFilterRow from './EntityFilterRow'

const StyledFilters = styled('div')`
  background-color: ${GREY_3};
  padding: ${SPACING.SCALE_2};
`

const EntityFilters = ({ entityFilters, setFilter }) => {
  return (
    <StyledFilters>
      {entityFilters.map(filterRow => (
        <EntityFilterRow filterRow={filterRow} setFilter={setFilter} key={uniqueId()} />
      ))}
    </StyledFilters>
  )
}

EntityFilters.propTypes = {
  entityFilters: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        width: PropTypes.string,
      }),
    ),
  ).isRequired,
  setFilter: PropTypes.func.isRequired,
}

export default EntityFilters
