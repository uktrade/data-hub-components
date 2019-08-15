import { InputField } from 'govuk-react'
import { uniqueId } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

const EntityFilter = ({ filter, setFilter }) => {
  return (
    <InputField
      onChange={e => setFilter(filter.key, e.target.value)}
      key={uniqueId()}
      input={{ name: filter.key }}
    >
      {filter.label}
    </InputField>
  )
}

EntityFilter.propTypes = {
  filter: PropTypes.shape({
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    width: PropTypes.string,
  }).isRequired,
  setFilter: PropTypes.func.isRequired,
}

export default EntityFilter
