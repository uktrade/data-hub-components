import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions/dist/index'
import { withKnobs } from '@storybook/addon-knobs'
import Button from '@govuk-react/button'

import FieldRadios from '../FieldRadios'
import Form from '../Form'
import FieldSelect from '../FieldSelect'

addDecorator(withKnobs)

storiesOf('Forms', module)
  .add('FieldRadios', () => (
    <Form onSubmit={action('onSubmit')}>
      {form => (
        <>
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
            ]}
          />
          <Button>Submit</Button>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </>
      )}
    </Form>
  ))
