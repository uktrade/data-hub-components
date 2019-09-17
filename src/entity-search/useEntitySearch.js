import { useState } from 'react'

function useEntitySearch(searchEntitiesCallback) {
  const [entities, setEntities] = useState(null)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onEntitySearch(filters = {}) {
    try {
      setIsSubmitting(true)
      const newEntities = await searchEntitiesCallback(filters)
      setError(null)
      setEntities(newEntities)
    } catch (ex) {
      setEntities(null)
      setError('Error occurred while searching entities.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    onEntitySearch,
    entities,
    error,
    isSubmitting,
  }
}

export default useEntitySearch
