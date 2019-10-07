import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions/dist/index'
import { withKnobs } from '@storybook/addon-knobs'
import Button from '@govuk-react/button'
import { H1 } from '@govuk-react/heading'

import FieldRadios from '../FieldRadios'
import Form from '../Form'
import FieldSelect from '../FieldSelect'

addDecorator(withKnobs)

const options = [
  { label: 'UK', value: 'uk' },
  {
    label: 'Overseas',
    value: 'overseas',
    hint: 'Hints are supported!',
    children: (
      <FieldSelect
        name="country"
        label="Country"
        required="Child elements validate too!"
        options={[
          { label: 'Germany', value: 'de' },
          { label: 'France', value: 'fr' },
          { label: 'Italy', value: 'it' },
        ]}
      />
    ),
  },
]

storiesOf('Forms', module).add('FieldRadios', () => (
  <Form onSubmit={action('onSubmit')}>
    {(form) => (
      <>
        <FieldRadios
          name="companyLocation"
          label="Where is the company based?"
          hint="Some hint"
          required="Specify where the company is based"
          options={options}
        />

        <FieldRadios
          name="companyLocation2"
          legend={<H1>Using H1 as legend</H1>}
          hint="Some hint"
          required="Specify where the company is based"
          options={options}
        />
        <Button>Submit</Button>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </>
    )}
  </Form>
))
