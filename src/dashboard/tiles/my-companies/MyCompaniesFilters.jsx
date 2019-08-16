import React, { useState } from 'react'

function MyCompaniesFilters({ initialCompanies, companies, onFilterUpdate }) {
  const [filterCompanyName, setFilterCompanyName] = useState('')

  function filterByName(e) {
    const companyName = e.target.value
    setFilterCompanyName(companyName)

    const filteredCompanies = initialCompanies.filter(
      c => c.companyName.toUpperCase().includes(companyName.toUpperCase()),
    )
    onFilterUpdate(filteredCompanies)
  }

  return (
    <div>
      <input type="text" onChange={filterByName} value={filterCompanyName} />
    </div>
  )
}

export default MyCompaniesFilters
