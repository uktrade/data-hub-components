import { useState } from 'react'

export default () => {
  const [filters, setFilters] = useState({})

  const setFilter = (name, value) => setFilters((prevFilters) => {
    return {
      ...prevFilters,
      [name]: value,
    }
  })

  return {
    filters,
    setFilter,
  }
}
