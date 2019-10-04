import React from 'react'
import { storiesOf } from '@storybook/react'
import PropTypes from 'prop-types'
import useMyCompaniesContext from '../my-companies/useMyCompaniesContext'
import MyCompaniesTile from '../my-companies/MyCompaniesTile'
import allCompanies from '../__fixtures__/companies.json'

const MyCompaniesDashboardStory = ({ fixture }) => {
  return (
    <useMyCompaniesContext.Provider
      mockInitialState={{ companiesInitial: fixture, companies: fixture }}
    >
      <MyCompaniesTile />
    </useMyCompaniesContext.Provider>
  )
}

storiesOf('Dashboard', module)
  .add('View all companies', () => (
    <MyCompaniesDashboardStory fixture={allCompanies} />
  ))
  .add('No companies', () => <MyCompaniesDashboardStory fixture={[]} />)

MyCompaniesDashboardStory.propTypes = {
  fixture: PropTypes.object.isRequired,
}
