import React from 'react'
import styled from 'styled-components'
import { GREY_3 } from 'govuk-colours'
import { SPACING } from '@govuk-react/constants'
import PropTypes from 'prop-types'
import { GridCol, GridRow } from 'govuk-react'

import EntityFilter from './EntityFilter'

const StyledFilters = styled('div')`
  background-color: ${GREY_3};
  padding: ${SPACING.SCALE_2};
`

const StyledGridRow = styled(GridRow)`
  & + & {
    margin-top: ${SPACING.SCALE_3};
  }
`

const getKey = (prefix, key) => {
  return `${prefix}-${key}`
}

const EntityFilters = ({ entityFilters, setFilter }) => {
  return (
    <StyledFilters>
      {entityFilters.map((filterRow, id) => (
        <StyledGridRow key={getKey('grid_row', id)}>
          {filterRow.map(filter => (
            <GridCol setWidth={filter.width} key={getKey('grid_col', filter.key)}>
              <EntityFilter
                filter={filter}
                setFilter={setFilter}
                key={getKey('entity_filter', filter.key)}
              />
            </GridCol>
          ))}
        </StyledGridRow>
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
        optional: PropTypes.bool,
      }),
    ),
  ).isRequired,
  setFilter: PropTypes.func.isRequired,
}

export default EntityFilters
