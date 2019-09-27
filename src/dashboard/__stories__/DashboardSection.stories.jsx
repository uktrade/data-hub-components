import React from 'react'
import { storiesOf } from '@storybook/react'
import useMyCompaniesContext from '../my-companies/useMyCompaniesContext'
import MyCompaniesTile from '../my-companies/MyCompaniesTile'
import allCompanies from '../__fixtures__/companies.json'


const WithData = props => (
  <useMyCompaniesContext.Provider {...props}>
    <MyCompaniesTile />
  </useMyCompaniesContext.Provider>
)

storiesOf('Dashboard')
  .add('No lists', () => (
    <WithData initialState={{
      lists: [],
    }}
    />
  ))
  .add('One empty list', () => (
    <WithData initialState={{
      lists: [
        {
          name: "I'm empty",
          companies: [],
        },
      ],
    }}
    />
  ))
  .add('One full list', () => (
    <WithData initialState={{
      lists: [
        {
          name: 'Foo',
          companies: allCompanies,
        },
      ],
    }}
    />
  ))
  .add('Three lists, first empty', () => (
    <WithData initialState={{
      lists: [
        {
          name: 'Foo',
          companies: allCompanies,
        },
        {
          name: 'Bar',
          companies: [],
        },
        {
          name: 'Baz',
          companies: allCompanies.slice(0, -1),
        },
      ],
    }}
    />
  ))
  .add('Three lists, first with single company', () => (
    <WithData initialState={{
      lists: [
        {
          name: 'Foo',
          companies: allCompanies,
        },
        {
          name: 'Bar',
          companies: allCompanies.slice(1, 2),
        },
        {
          name: 'Baz',
          companies: allCompanies.slice(0, -1),
        },
      ],
    }}
    />
  ))
  .add('Three company lists', () => (
    <WithData initialState={{
      lists: [
        {
          name: 'Foo',
          companies: allCompanies,
        },
        {
          name: 'Bar',
          companies: allCompanies.slice(1),
        },
        {
          name: 'Baz',
          companies: allCompanies.slice(0, -1),
        },
      ],
    }}
    />
  ))
