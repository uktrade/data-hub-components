import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { H3 } from '@govuk-react/heading'

import { FieldInput, FormStateful, Step, useFormContext } from '../../../index'
import FieldRadios from '../FieldRadios'
import FieldSelect from '../FieldSelect'
import FieldDnbCompany from '../FieldDnbCompany'
import { setupSuccessMocks } from '../../../entity-search/__mocks__/company-search'
import StatusMessage from '../../../status-message/StatusMessage'
import EntityListItem from '../../../entity-search/EntityListItem'

addDecorator(withKnobs)

function Values() {
  const form = useFormContext()
  return <pre>{JSON.stringify(form, null, 2)}</pre>
}

function StepHeader() {
  const { currentStep, steps } = useFormContext()
  return (
    <div>
      Step {currentStep + 1} of {steps.length}
    </div>
  )
}

storiesOf('Forms', module).add('FormStateful - Full example', () => {
  const showError = boolean('Show error', false)

  async function onSubmitHandler(values) {
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        return showError ? reject(new Error('Some unknown error!')) : resolve()
      }, 1000)
    )
    action('onSubmitHandler')(values)
    return 'http://example.com'
  }

  const ENTITY_SEARCH_ENDPOINT = 'http://localhost:3010/v4/dnb/company-search'
  setupSuccessMocks(ENTITY_SEARCH_ENDPOINT)
  return (
    <FormStateful
      onSubmit={onSubmitHandler}
      onExit={() => 'Changes that you made will not be saved.'}
    >
      {({ values, submissionError, goForward }) => (
        <>
          <StepHeader />

          {submissionError && (
            <StatusMessage>{submissionError.message}</StatusMessage>
          )}

          <Step name="first">
            <FieldInput
              type="number"
              name="age"
              label="Age"
              required="Enter age"
            />
            <FieldInput
              type="number"
              name="height"
              label="Height"
              required="Enter height"
            />

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
                      validate={(value) =>
                        value !== 'Italy' ? 'Select Italy' : null
                      }
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
              <FieldInput
                type="text"
                name="Job"
                label="Job"
                required="Enter job"
              />
            </Step>
          )}

          <Step name="third" forwardButton={null} backButton={null}>
            <FieldDnbCompany
              name="dnb_company"
              legend={<H3>Find the company</H3>}
              country={values.country || values.companyLocation}
              apiEndpoint={ENTITY_SEARCH_ENDPOINT}
              entityRenderer={(props) => (
                <EntityListItem onEntityClick={goForward} {...props} />
              )}
              onCannotFind={() => {
                goForward()
              }}
            />
          </Step>

          <Step name="fourth">
            <p>Last step</p>
          </Step>

          <Values />
        </>
      )}
    </FormStateful>
  )
})
