import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { H3 } from '@govuk-react/heading'

import Form from '../Form'
import Step from '../Step'
import useFormContext from '../../hooks/useFormContext'
import FieldDnbCompany from '../FieldDnbCompany'
import {
  setupErrorMocks,
  setupNoResultsMocks,
  setupSuccessMocks,
} from '../../../entity-search/__mocks__/company-search'

const API_ENDPOINT = 'http://localhost:3010/v4/dnb/company-search'

function Values() {
  const form = useFormContext()
  return <pre>{JSON.stringify(form, null, 2)}</pre>
}

storiesOf('Forms', module)
  .add('FieldDnbCompany - success', () => {
    const queryParams = {
      address_country: 'GB',
    }

    setupSuccessMocks(API_ENDPOINT, { delayResponse: 750 }, queryParams)

    return (
      <Form onSubmit={action('onSubmit')}>
        {({ values }) => (
          <>
            <Step name="first" forwardButton={null}>
              <FieldDnbCompany
                name="dnb_company"
                legend={<H3>Find the company</H3>}
                country="UK"
                apiEndpoint={API_ENDPOINT}
                queryParams={queryParams}
              />
            </Step>

            {!values.cannotFind && (
              <Step name="second">
                <p>Company selected</p>
              </Step>
            )}

            {values.cannotFind && (
              <Step name="third">
                <p>Cannot find company</p>
              </Step>
            )}

            <Values />
          </>
        )}
      </Form>
    )
  })
  .add('FieldDnbCompany - error', () => {
    setupErrorMocks(API_ENDPOINT)

    return (
      <Form onSubmit={action('onSubmit')}>
        <>
          <Step name="first" forwardButton={null}>
            <FieldDnbCompany
              name="dnb_company"
              legend={<H3>Find the company</H3>}
              country="UK"
              apiEndpoint={API_ENDPOINT}
            />
          </Step>

          <Values />
        </>
      </Form>
    )
  })
  .add('FieldDnbCompany - no results', () => {
    setupNoResultsMocks(API_ENDPOINT)

    return (
      <Form onSubmit={action('onSubmit')}>
        <>
          <Step name="first" forwardButton={null}>
            <FieldDnbCompany
              name="dnb_company"
              legend={<H3>Find the company</H3>}
              country="UK"
              apiEndpoint={API_ENDPOINT}
            />
          </Step>

          <Values />
        </>
      </Form>
    )
  })
