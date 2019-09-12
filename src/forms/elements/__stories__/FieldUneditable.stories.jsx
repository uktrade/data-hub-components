import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'

import Form from '../Form'
import FieldUneditable from '../FieldUneditable'

addDecorator(withKnobs)

storiesOf('Forms', module)
  .add('FieldUneditable', () => (
    <Form>
      <FieldUneditable
        name="testField"
        label="Country"
        hint="Your selection from the previous step"
        onChangeClick={action('onChangeClick')}
      >
        United Kingdom
      </FieldUneditable>
    </Form>
  ))
