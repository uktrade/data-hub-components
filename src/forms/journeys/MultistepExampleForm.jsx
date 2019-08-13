import React from 'react'

import Form from '../core/Form'
import Step from '../core/Step'
import useFormContext from '../core/useFormContext'
import FieldInput from '../elements/FieldInput'

function Values() {
  const form = useFormContext()
  return (
    <>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </>
  )
}

function sendToBackend(values) {
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(values))
}

function StepHeader() {
  const { currentStep, steps } = useFormContext()
  return (
    <div>Step {currentStep + 1} of {steps.length}</div>
  )
}

function MultistepExampleForm() {
  return (
    <Form
      onSubmit={sendToBackend}
    >
      {({ values }) => (
        <>
          <StepHeader />

          <Step name="first">
            <FieldInput type="number" name="age" label="Age" validate={value => (!value ? 'Age is required' : null)} />
            <FieldInput type="number" name="height" label="Height" validate={value => (!value ? 'Height is required' : null)} />
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
}

export default MultistepExampleForm
