import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions/dist/index'
import { withKnobs, text, object } from '@storybook/addon-knobs'
import Button from '@govuk-react/button'

import FieldSelect from '../FieldSelect'
import Form from '../Form'

addDecorator(withKnobs)

storiesOf('Forms', module)
  .add('FieldSelect - Default', () => (
    <Form onSubmit={action('onSubmit')}>
      <FieldSelect
        name="testField"
        emptyOption={text('emptyOption', 'Please select')}
        options={object('options', [
          { label: 'testOptionLabel1', value: 'testOptionValue1' },
          { label: 'testOptionLabel2', value: 'testOptionValue2' },
        ])}
        required="Select one of the options"
        validate={value => (value !== 'testOptionValue2' ? text('error', 'You need to select testOptionValue2') : null)}
      />

      <Button>Submit</Button>
    </Form>
  ))