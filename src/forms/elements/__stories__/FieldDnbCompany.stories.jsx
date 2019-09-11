import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import FieldDnbCompany from '../FieldDnbCompany'
import Form from '../Form'
import Step from '../Step'
import { setupSuccessMocks } from '../../../entity-search/__mocks__/company-search'
import { useFormContext } from '../../../index'

const API_ENDPOINT = 'http://localhost:3010/v4/dnb/company-search'

function Values() {
  const form = useFormContext()
  return (
    <>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </>
  )
}

storiesOf('Forms', module)
  .add('FieldDnbCompany', () => {
    setupSuccessMocks(API_ENDPOINT)

    return (
      <Form onSubmit={action('onSubmit')}>
        {({ values }) => (
          <>
            <Step name="first" hideForwardButton={true}>
              <FieldDnbCompany
                name="dnb_company"
                label="Find the company"
                country="UK"
                apiEndpoint={API_ENDPOINT}
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
