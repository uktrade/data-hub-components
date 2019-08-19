import { uniqueId } from 'lodash'
import { GridCol, GridRow } from 'govuk-react'
import React from 'react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import PropTypes from 'prop-types'

import EntityFilter from './EntityFilter'

const StyledGridRow = styled(GridRow)`
  & + & {
    margin-top: ${SPACING.SCALE_2};
  }
`

const EntityFilterRow = ({ filterRow, setFilter }) => {
  return (
    <StyledGridRow>
      {
        filterRow.map(filter => (
          <GridCol setWidth={filter.width} key={uniqueId()}>
            <EntityFilter filter={filter} setFilter={setFilter} key={uniqueId()} />
          </GridCol>
        ))
      }
    </StyledGridRow>
  )
}

EntityFilterRow.propTypes = {
  filterRow: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      width: PropTypes.string,
    }),
  ).isRequired,
  setFilter: PropTypes.func.isRequired,
}

export default EntityFilterRow
