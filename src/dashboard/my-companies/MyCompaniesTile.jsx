import React, { Fragment } from 'react'
import Details from '@govuk-react/details'
import useMyCompaniesContext from './useMyCompaniesContext'

import DashboardSection from '../DashboardSection'
import MyCompaniesFilters from './MyCompaniesFilters'
import MyCompaniesTable from './MyCompaniesTable'

const HelpText = () => (
  <Details summary="How do I remove a company from this list">
    You can remove a company from your list in the company&apos;s page.
  </Details>
)

function MyCompaniesTile() {
  const { state } = useMyCompaniesContext()

  const hasCompanies = !!state.companies.length
  const isFiltering = !!state.filterText.length
  const hasNoCompaniesInWatchList = !hasCompanies && !isFiltering
  const hasNoResults = !!state.companiesInitial.length && !state.companies.length

  const SubHeading = (
    <Fragment>
      You have not added any companies to your list. <br />
      You can add companies to this list from a company page, and only you can see this list.
    </Fragment>
  )

  return (
    <DashboardSection
      heading="My Companies"
      headingSlotComponent={!!state.companiesInitial.length && <MyCompaniesFilters />}
      subHeading={SubHeading}
      showSubHeading={hasNoCompaniesInWatchList}
    >
      {hasCompanies && (
        <Fragment>
          <MyCompaniesTable /> <HelpText />
        </Fragment>
      )}
      {hasNoResults && <p>No companies match your search</p>}
    </DashboardSection>
  )
}

export default MyCompaniesTile
