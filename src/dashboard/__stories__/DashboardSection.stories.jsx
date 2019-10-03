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
    <WithData />
  ))
  .add('One empty list', () => (
    <WithData lists={[
      {
        name: "I'm empty",
        companies: [],
      },
    ]}
    />
  ))
  .add('One full list', () => (
    <WithData lists={[
      {
        name: 'Foo',
        companies: allCompanies,
      },
    ]}
    />
  ))
  .add('Three lists, first empty', () => (
    <WithData lists={[
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
    ]}
    />
  ))
  .add('Three lists, first with single company', () => (
    <WithData lists={[
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
    ]}
    />
  ))
  .add('Three company lists', () => (
    <WithData lists={[
      {
        name: 'Very long list name lorem ipsum dolor sit amet',
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
    ]}
    />
  ))
  .add('remove me', () => (
    <WithData lists={[
      {
        name: 'Foo',
        companies: [
          {
            company: {
              name: 'Company A',
              id: 'a',
            },
            latestInteraction: {
              id: 'a',
              date: '2019-01-06',
              displayDate: '6 Jan 2019',
              subject: 'Interaction A',
            },
          },
          {
            company: {
              name: 'Company B',
              id: 'b',
            },
            latestInteraction: {
              id: 'a',
              date: '2019-01-04',
              displayDate: '4 Jan 2019',
              subject: 'Interaction B',
            },
          },
          {
            company: {
              name: 'Company C',
              id: 'c',
            },
            latestInteraction: {
              id: 'c',
              date: '2019-01-05',
              displayDate: '5 Jan 2019',
              subject: 'Interaction C',
            },
          },
        ],
      },
    ]}
    />
  ))
