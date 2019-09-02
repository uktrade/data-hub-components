import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { useFormContext, Form, Step, FieldInput } from '../../../index'
import FieldRadios from '../FieldRadios'
import FieldSelect from '../FieldSelect'

function Values() {
  const form = useFormContext()
  return (
    <>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </>
  )
}

function StepHeader() {
  const { currentStep, steps } = useFormContext()
  return (
    <div>Step {currentStep + 1} of {steps.length}</div>
  )
}

storiesOf('Forms', module)
  .add('Multistep Example Form', () => {
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
                  { label: 'UK', value: 'uk' },
                  {
                    label: 'Overseas',
                    value: 'overseas',
                    children: (
                      <FieldInput type="text" name="overseasCountryName" />
                    ),
                  },
                ]}
              />

              <FieldSelect
                name="country"
                label="Country"
                required="Chose one of the countries"
                validate={value => (value !== 'it' ? 'You need to select Italy' : null)}
                options={[
                  { label: 'Germany', value: 'de' },
                  { label: 'France', value: 'fr' },
                  { label: 'Italy', value: 'it' },
                ]}
              />
            </Step>

            {values.age === '1' && (
              <Step name="second" label="Add a Company">
                <FieldInput type="text" name="name" label="Name" required="Enter name" />
                <FieldInput type="email" name="email" label="Email" />
              </Step>
            )}

            <Step name="third">
              <FieldInput type="number" name="shoeSize" label="Shoe size" required="Enter shoe size" />
            </Step>

            <Step name="fourth">
              <FieldInput type="text" name="lastName" label="Last name" />
            </Step>

            <Values />
          </>
        )}
      </Form>
    )
  })
