import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions/dist/index'
import { withKnobs } from '@storybook/addon-knobs'
import Button from '@govuk-react/button'

import FieldInput from '../FieldInput'
import FormStateful from '../FormStateful'

addDecorator(withKnobs)

storiesOf('Forms', module)
  .add('FieldInput - Text', () => (
    <FormStateful onSubmit={action('onSubmit')}>
      {(state) => (
        <>
          <FieldInput
            label="Text"
            hint="Some hint"
            name="testField"
            required="Enter text"
            type="text"
          />
          <Button>Submit</Button>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </>
      )}
    </FormStateful>
  ))
  .add('FieldInput - Number', () => (
    <FormStateful onSubmit={action('onSubmit')}>
      {(state) => (
        <>
          <FieldInput
            label="Number"
            hint="Some hint"
            name="testField"
            required="Enter number"
            type="number"
          />
          <Button>Submit</Button>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </>
      )}
    </FormStateful>
  ))
