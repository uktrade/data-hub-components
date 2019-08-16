import React, { useState } from 'react'

import MyCompaniesFilters from './MyCompaniesFilters'

function MyCompaniesTile({ data }) {
  const [companies, setCompanies] = useState(data)

  function onFilterUpdate(newCompanies) {
    setCompanies(newCompanies)
  }

  return (
    <>
      <MyCompaniesFilters initialCompanies={data} companies={companies} onFilterUpdate={onFilterUpdate} />
      <pre>{JSON.stringify(companies)}</pre>
    </>
  )
}

export default MyCompaniesTile
