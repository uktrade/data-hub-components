import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { H3 } from '@govuk-react/heading'

import { useFormContext, Form, Step, FieldInput } from '../../../index'
import FieldRadios from '../FieldRadios'
import FieldSelect from '../FieldSelect'
import FieldDnbCompany from '../FieldDnbCompany'
import { setupSuccessMocks } from '../../../entity-search/__mocks__/company-search'

addDecorator(withKnobs)

function Values() {
  const form = useFormContext()
  return <pre>{JSON.stringify(form, null, 2)}</pre>
}

function StepHeader() {
  const { currentStep, steps } = useFormContext()
  return (
    <div>Step {currentStep + 1} of {steps.length}</div>
  )
}

storiesOf('Forms', module)
  .add('Form - Full example', () => {
    const ENTITY_SEARCH_ENDPOINT = 'http://localhost:3010/v4/dnb/company-search'
    setupSuccessMocks(ENTITY_SEARCH_ENDPOINT)
    return (
      <Form onSubmit={action('onSubmit')}>
        {({ values }) => (
          <>
            <StepHeader />

            <Step name="first">
              <FieldInput type="number" name="age" label="Age" required="Enter age" />
              <FieldInput type="number" name="height" label="Height" required="Enter height" />

              <FieldRadios
                name="companyLocation"
                label="Where is the company based?"
                required="Specify where the company is based"
                options={[
                  { label: 'UK', value: 'UK' },
                  {
                    label: 'Overseas',
                    value: 'overseas',
                    children: (
                      <FieldSelect
                        name="country"
                        label="Country"
                        required="Chose one of the countries"
                        validate={value => (value !== 'Italy' ? 'Select Italy' : null)}
                        options={[
                          { label: 'Germany', value: 'Germany' },
                          { label: 'France', value: 'France' },
                          { label: 'Italy', value: 'Italy' },
                        ]}
                      />
                    ),
                  },
                ]}
              />
            </Step>

            {values.age >= '18' && (
              <Step name="second">
                <FieldInput type="text" name="Job" label="Job" required="Enter job" />
              </Step>
            )}

            <Step name="third" hideForwardButton={true} hideBackButton={true}>
              <FieldDnbCompany
                name="dnb_company"
                legend={<H3>Find the company</H3>}
                country={values.country || values.companyLocation}
                apiEndpoint={ENTITY_SEARCH_ENDPOINT}
              />
            </Step>

            <Step name="fourth">
              <p>Last step</p>
            </Step>

            <Values />
          </>
        )}
      </Form>
    )
  })
