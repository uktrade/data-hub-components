import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '@govuk-react/button'
import Link from '@govuk-react/link'

import FormActions from '../FormActions'

storiesOf('Forms', module)
  .add('FormActions', () => (
    <FormActions>
      <Button>Save</Button>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link href="#">Return without saving</Link>
    </FormActions>
  ))
