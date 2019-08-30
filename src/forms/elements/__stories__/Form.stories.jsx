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
              <FieldInput type="number" name="age" label="Age" validate={value => (!value ? 'Age is required' : null)} />
              <FieldInput type="number" name="height" label="Height" validate={value => (!value ? 'Height is required' : null)} />

              <FieldRadios
                name="companyLocation"
                label="Where is the company based?"
                validate={value => (!value ? 'Please specify where the company is based' : null)}
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
                validate={value => (!value ? 'Please specify where the company is based' : null)}
                options={[
                  { label: 'Germany', value: 'de' },
                  { label: 'France', value: 'fr' },
                  { label: 'Italy', value: 'it' },
                ]}
              />
            </Step>

            {values.age === '1' && (
              <Step name="second" label="Add a Company">
                <FieldInput type="text" name="name" label="Name" validate={value => (!value ? 'name is required' : null)} />
                <FieldInput type="email" name="email" label="Email" />
              </Step>
            )}

            <Step name="third">
              <FieldInput type="number" name="shoeSize" label="Shoe size" validate={value => (!value ? 'Shoe size is required' : null)} />
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
