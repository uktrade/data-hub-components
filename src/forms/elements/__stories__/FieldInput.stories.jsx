import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions/dist/index'
import { withKnobs } from '@storybook/addon-knobs'
import Button from '@govuk-react/button'

import Form from '../Form'
import FieldInput from '../FieldInput'

addDecorator(withKnobs)

storiesOf('Forms', module)
  .add('FieldInput - Text', () => (
    <Form onSubmit={action('onSubmit')}>
      {(form) => (
        <>
          <FieldInput
            label="Text"
            hint="Some hint"
            name="testField"
            required="Enter text"
            type="text"
          />
          <Button>Submit</Button>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </>
      )}
    </Form>
  ))
  .add('FieldInput - Number', () => (
    <Form onSubmit={action('onSubmit')}>
      {(form) => (
        <>
          <FieldInput
            label="Number"
            hint="Some hint"
            name="testField"
            required="Enter number"
            type="number"
          />
          <Button>Submit</Button>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </>
      )}
    </Form>
  ))
