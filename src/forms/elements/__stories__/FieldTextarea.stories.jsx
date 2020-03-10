import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import Button from '@govuk-react/button'

import FieldTextarea from '../FieldTextarea'
import Form from '../Form'

addDecorator(withKnobs)

storiesOf('Forms', module).add('FieldTextarea', () => (
  <Form onSubmit={action('onSubmit')}>
    {(state) => (
      <>
        <FieldTextarea
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
  </Form>
))
