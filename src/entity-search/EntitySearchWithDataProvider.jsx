import React, { useState } from 'react'
import PropTypes from 'prop-types'

import EntitySearch from './EntitySearch'

const EntitySearchWithDataProvider = (props) => {
  const { getEntities } = props
  const [entities, setEntities] = useState(null)
  const [error, setError] = useState(null)
  const onEntitySearch = async (filters) => {
    setEntities(null)
    setError(null)
    try {
      setEntities(await getEntities(filters))
    } catch (ex) {
      setError('Error occurred while searching entities.')
    }
  }

  return (
    <EntitySearch
      entities={entities}
      error={error}
      onEntitySearch={onEntitySearch}
      {...props}
    />
  )
}

EntitySearchWithDataProvider.propTypes = {
  getEntities: PropTypes.func.isRequired,
}

export default EntitySearchWithDataProvider
