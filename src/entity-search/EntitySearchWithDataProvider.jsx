import React, { useState } from 'react'
import PropTypes from 'prop-types'

import EntitySearch from './EntitySearch'

const EntitySearchWithDataProvider = (props) => {
  const { getEntities } = props
  const [entities, setEntities] = useState([])
  const onEntitySearch = async (filters) => {
    setEntities(await getEntities(filters))
  }

  return <EntitySearch entities={entities} onEntitySearch={onEntitySearch} {...props} />
}

EntitySearchWithDataProvider.propTypes = {
  getEntities: PropTypes.func.isRequired,
}

export default EntitySearchWithDataProvider
