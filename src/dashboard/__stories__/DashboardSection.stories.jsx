import React from 'react'
import { storiesOf } from '@storybook/react'
import PropTypes from 'prop-types'
import useMyCompaniesContext from '../my-companies/useMyCompaniesContext'
import useMycompaniesLists from '../my-companies/useMycompaniesListsContext'
import MyCompaniesTile from '../my-companies/MyCompaniesTile'
import MyCompaniesListTile from '../my-companies/multiLists/MyCompaniesTile'
import allCompanies from '../__fixtures__/companies.json'
import multiListCompanies from '../__fixtures__/multi-list-companies.json'

const MyCompaniesDashboardStory = ({ fixture }) => {
  return (
    <useMyCompaniesContext.Provider
      mockInitialState={{ companiesInitial: fixture, companies: fixture }}
    >
      <MyCompaniesTile />
    </useMyCompaniesContext.Provider>
  )
}

const MyCompaniesListDashboardStory = ({ fixture }) => {
  return (
    <useMycompaniesLists.Provider
      mockInitialState={{ companiesInitial: fixture, companies: fixture }}
    >
      <MyCompaniesListTile />
    </useMycompaniesLists.Provider>
  )
}

storiesOf('Dashboard', module)
  .add('View all companies', () => <MyCompaniesDashboardStory fixture={allCompanies} />)
  .add('No companies', () => <MyCompaniesDashboardStory fixture={[]} />)
  .add('Multi list', () => <MyCompaniesListDashboardStory fixture={multiListCompanies} />)

MyCompaniesDashboardStory.propTypes = {
  fixture: PropTypes.object.isRequired,
}

MyCompaniesListDashboardStory.propTypes = {
  fixture: PropTypes.object.isRequired,
}
