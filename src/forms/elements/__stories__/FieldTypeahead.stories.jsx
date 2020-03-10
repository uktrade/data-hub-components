import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import Button from '@govuk-react/button'

import Form from '../Form'
import FieldTypeahead from '../FieldTypeahead'

addDecorator(withKnobs)

const asyncOptions = [
  {
    value: '379f390a-e083-4a2c-9cea-e3b9a08606a7',
    label: 'Holly Clins - olHeart of the South West LEP',
  },
  {
    value: '8dcd2bb8-dc73-4a42-8655-4ae42d4d3c5a',
    label: 'Bernard Harris-Patelc - Welsh Government (Investment)',
  },
  {
    value: 'a6f39399-5bf4-46cb-a686-826f73e9f0ca',
    label: 'Dennis Kennedy',
  },
]

const getOptions = () =>
  new Promise((resolve) => setTimeout(resolve, 1000, asyncOptions))

storiesOf('Forms', module).add('FieldTypeahead', () => (
  <Form onSubmit={action('onSubmit')}>
    {(state) => (
      <>
        <FieldTypeahead
          label="Typeahead"
          hint="Some hint"
          name="testField"
          required="Chose value"
          loadOptions={getOptions}
        />
        <Button>Submit</Button>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </>
    )}
  </Form>
))
