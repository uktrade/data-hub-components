import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { H2 } from '@govuk-react/heading'
import GridCol from '@govuk-react/grid-col'
import GridRow from '@govuk-react/grid-row'
import Main from '@govuk-react/main'
import { SPACING } from '@govuk-react/constants'
import PropTypes from 'prop-types'

import { setupSuccessMocks, setupErrorMocks, setupNoResultsMocks } from '../__mocks__/company-search'
import dataHubAddCompanyBackground from './images/data-hub-add-company.png'
import dnbCompanySearchDataProvider from '../data-providers/DnbCompanySearch'
import EntitySearchWithDataProvider from '../EntitySearchWithDataProvider'
import StatusMessage from '../../status-message/StatusMessage'

const apiEndpoint = 'http://localhost:3010/v4/dnb/company-search'

const EntitySearchForStorybook = ({ previouslySelected, entityListHeader, cannotFindLink }) => {
  return (
    <Main>
      <GridRow>
        <GridCol>
          <img src={dataHubAddCompanyBackground} width="960" alt="Data Hub" />
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
                {
                  label: 'Company name',
                  key: 'search_term',
                },
              ],
              [
                {
                  label: 'Company postcode',
                  key: 'postal_code',
                  width: 'one-half',
                  optional: true,
                },
              ],
            ]}
            entityListHeader={entityListHeader}
            cannotFind={{
              summary: 'I cannot find the company I am looking for',
              actions: [
                'checking the company name for spelling errors',
                'making sure you selected the correct country',
                'adding a postcode to your search to narrow down the results',
              ],
              link: cannotFindLink,
            }}
            onEntityClick={(entity) => {
              if (!entity.datahub_company) {
                action('EntitySearchWithDataProvider.onEntityClick')(entity)
              }
            }}
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
  entityListHeader: PropTypes.node,
  cannotFindLink: {
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    onClick: PropTypes.func,
  },
}

EntitySearchForStorybook.defaultProps = {
  previouslySelected: null,
  entityListHeader: null,
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
  .add('Data Hub company search with entity list header', () => {
    setupSuccessMocks()

    return (
      <EntitySearchForStorybook
        entityListHeader={(
          <StatusMessage>
            The search results below are verified company records from Dun & Bradstreet,
            an external and up to date source of company information.
          </StatusMessage>
        )}
      />
    )
  })
  .add('Data Hub company search with cannot find link callback', () => {
    setupSuccessMocks()

    return (
      <EntitySearchForStorybook
        cannotFindLink={{
          text: 'I still cannot find the company',
          onClick: action('EntitySearchForStorybook.onClick'),
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
          onChangeClick: action('EntitySearchForStorybook.onChangeClick'),
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
    setupNoResultsMocks()

    return (
      <EntitySearchForStorybook />
    )
  })