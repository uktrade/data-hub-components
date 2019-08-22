import React from 'react'
import { storiesOf } from '@storybook/react'
import { GridCol, GridRow, Main, H2 } from 'govuk-react'
import { SPACING } from '@govuk-react/constants'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import PropTypes from 'prop-types'

import dataHubAddCompany from '../../assets/images/data-hub-add-company.png'
import fixtures from './fixtures'
import dnbCompanySearchDataProvider from './data-providers/DnbCompanySearch'
import EntitySearchWithDataProvider from './EntitySearchWithDataProvider'

const mock = new MockAdapter(axios)
const apiEndpoint = 'http://localhost:3010/v4/dnb/company-search'
const apiEndpointWithParameters = new RegExp(`${apiEndpoint}.+`)

const setupSuccessMocks = (response = fixtures.companySearch) => {
  mock.onPost(apiEndpoint).reply(200, response)
  mock.onPost(apiEndpointWithParameters).reply(200, response)
}

const setupErrorMocks = () => {
  mock.onPost(apiEndpoint).reply(500)
  mock.onPost(apiEndpointWithParameters).reply(500)
}

const EntitySearchForStorybook = ({ previouslySelected, cannotFindLink }) => {
  return (
    <Main>
      <GridRow>
        <GridCol>
          <img src={dataHubAddCompany} width="960" alt="Data Hub" />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol style={{ margin: SPACING.SCALE_2 }}>
          <H2 style={{ fontSize: '24px' }}>Find the company</H2>
          <EntitySearchWithDataProvider
            getEntities={dnbCompanySearchDataProvider(apiEndpoint)}
            previouslySelected={previouslySelected}
            entityFilters={[
              [
                { label: 'Company name', key: 'search_term' },
              ],
              [
                { label: 'Company postcode', key: 'address_postcode', width: 'one-half' },
              ],
            ]}
            cannotFind={{
              summary: 'I cannot find the company I am looking for',
              actions: [
                'Check the country selected is correct',
                'Check for spelling errors in the company name',
                'Remove or add Ltd or Limited to your search',
              ],
              link: cannotFindLink,
            }}
            onEntityClick={entity => alert(`Selected ${JSON.stringify(entity)}`)}
          />
        </GridCol>
      </GridRow>
    </Main>
  )
}

EntitySearchForStorybook.propTypes = {
  previouslySelected: {
    text: PropTypes.string.isRequired,
    onChangeClick: PropTypes.func.isRequired,
  },
  cannotFindLink: {
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    onClick: PropTypes.func,
  },
}

EntitySearchForStorybook.defaultProps = {
  previouslySelected: null,
  cannotFindLink: {
    text: 'I still cannot find the company',
    url: 'http://stillcannotfind.com',
  },
}

storiesOf('EntitySearch', module)
  .add('Data Hub company search', () => {
    setupSuccessMocks()

    return (
      <EntitySearchForStorybook />
    )
  })
  .add('Data Hub company search with cannot find link callback', () => {
    setupSuccessMocks()

    return (
      <EntitySearchForStorybook
        cannotFindLink={{
          text: 'I still cannot find the company',
          onClick: () => {
            alert('Still cannot find :(')
          },
        }}
      />
    )
  })
  .add('Data Hub company search with previously selected value and "Change" link', () => {
    setupSuccessMocks()

    return (
      <EntitySearchForStorybook
        previouslySelected={{
          text: 'Based in the UK',
          onChangeClick: () => alert('Change previously selected'),
        }}
      />
    )
  })
  .add('Data Hub company search with server error', () => {
    setupErrorMocks()

    return (
      <EntitySearchForStorybook />
    )
  })
  .add('Data Hub company search with no results', () => {
    setupSuccessMocks(fixtures.companySearchNoResults)

    return (
      <EntitySearchForStorybook />
    )
  })
