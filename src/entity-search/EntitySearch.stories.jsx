import React from 'react'
import { storiesOf } from '@storybook/react'
import { GridCol, GridRow, Main, H2 } from 'govuk-react'
import { SPACING } from '@govuk-react/constants'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import dataHubAddCompany from '../../assets/images/data-hub-add-company.png'
import companySearchFixture from './fixtures/company-search'
import dnbCompanySearchDataProvider from './data-providers/DnbCompanySearch'
import EntitySearchWithDataProvider from './EntitySearchWithDataProvider'

storiesOf('EntitySearch', module)
  .add('Data Hub company search', () => {
    const mock = new MockAdapter(axios)
    const apiEndpoint = 'http://localhost:3010/v4/dnb/company-search'
    mock.onPost(apiEndpoint).reply(200, companySearchFixture)

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
            />
          </GridCol>
        </GridRow>
      </Main>
    )
  })
