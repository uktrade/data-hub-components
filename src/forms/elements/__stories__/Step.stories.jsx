import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Form, Step, useFormContext } from '../../../index'

function Values() {
  const form = useFormContext()
  const debug = {
    ...form,
    isFirstStep: form.isFirstStep(),
    isLastStep: form.isLastStep(),
  }

  return (
    <>
      <pre>{JSON.stringify(debug, null, 2)}</pre>
    </>
  )
}

function StepHeader() {
  const { currentStep, steps } = useFormContext()
  return (
    <div>
      Step {currentStep + 1} of {steps.length}
    </div>
  )
}

storiesOf('Forms', module).add('Step', () => {
  return (
    <Form onSubmit={action('onSubmit')}>
      <StepHeader />

      <Step name="first">
        <Values />
      </Step>

      <Step name="second" forwardButton="GO FORWARD!" backButton="GO BACK!">
        <Values />

        <p>
          Custom button labels <span role="img">⬇</span>️
        </p>
      </Step>

      <Step name="third">
        <Values />
      </Step>

      <Step name="fourth">
        <Values />
      </Step>
    </Form>
  )
})
