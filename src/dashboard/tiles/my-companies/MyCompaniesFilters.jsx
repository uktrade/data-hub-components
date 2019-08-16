import React, { useState } from 'react'

function MyCompaniesFilters({ companies, onFilterUpdate }) {
  const [filterCompanyName, setFilterCompanyName] = useState('')

  function filterByName(e) {
    const companyName = e.target.value
    setFilterCompanyName(companyName)

    const filteredCompanies = companies.filter(
      c => { return c.companyName.toUpperCase().includes(companyName.toUpperCase()) },
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
