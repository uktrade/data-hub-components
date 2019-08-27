import { InputField } from 'govuk-react'
import React from 'react'
import PropTypes from 'prop-types'

const EntityFilter = ({ filter, setFilter }) => {
  const { key, label } = filter
  return (
    <InputField
      onChange={e => setFilter(key, e.target.value)}
      key={key}
      input={{ name: key }}
    >
      {label}
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
