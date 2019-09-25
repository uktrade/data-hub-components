import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '@govuk-react/button'
import { H1 } from '@govuk-react/heading'
import Form from '../Form'
import FieldCheckboxes from '../FieldCheckboxes'

const options = [
  {
    label: 'Italy',
    value: 'it',
  },
  {
    label: 'Poland',
    value: 'pl',
  },
  {
    label: 'United Kingdom',
    value: 'gb',
  },
  {
    label: 'United States',
    value: 'us',
    hint: 'Hints are supported!',
  },
]

storiesOf('Forms', module)
  .add('FieldCheckboxes', () => (
    <Form>
      {form => (
        <>
          <FieldCheckboxes
            name="countries"
            label="What are your favourite countries?"
            hint="Some hint"
            required="Select at least one country"
            options={options}
          />

          <FieldCheckboxes
            name="countries2"
            legend={<H1>Using H1 as legend</H1>}
            hint="Some hint"
            required="Select at least one country"
            options={options}
          />

          <Button>Submit</Button>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </>
      )}
    </Form>
  ))
