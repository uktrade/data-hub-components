import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions/dist/index'
import { object, text, withKnobs } from '@storybook/addon-knobs'
import Button from '@govuk-react/button'

import FieldSelect from '../FieldSelect'
import FormStateful from '../FormStateful'

addDecorator(withKnobs)

storiesOf('Forms', module).add('FieldSelect', () => (
  <FormStateful onSubmit={action('onSubmit')}>
    {(form) => (
      <>
        <FieldSelect
          name="testField"
          label="Test select"
          hint="Some hint"
          emptyOption={text('emptyOption', 'Please select')}
          options={object('options', [
            { label: 'testOptionLabel1', value: 'testOptionValue1' },
            { label: 'testOptionLabel2', value: 'testOptionValue2' },
          ])}
          required="Select one of the options"
          validate={(value) =>
            value !== 'testOptionValue2'
              ? text('error', 'You need to select testOptionValue2')
              : null
          }
        />
        <Button>Submit</Button>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </>
    )}
  </FormStateful>
))
