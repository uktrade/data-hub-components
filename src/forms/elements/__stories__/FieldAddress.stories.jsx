import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions/dist/index'
import { text, withKnobs } from '@storybook/addon-knobs'
import Button from '@govuk-react/button'
import { SPACING } from '@govuk-react/constants'
import styled from 'styled-components'

import Form from '../Form'
import FieldAddress from '../FieldAddress'

addDecorator(withKnobs)

const StyledButton = styled(Button)`
  margin-top: ${SPACING.SCALE_3};
`

const POSTCODE_SEARCH_ENDPOINT = 'https://api.getaddress.io/v2/uk'

storiesOf('Forms', module)
  .add('FieldAddress', () => (
    <Form onSubmit={action('onSubmit')}>
      {form => (
        <>
          <FieldAddress
            country="United Kingdom"
            name="company_address"
            apiKey={text('API KEY', 'YOUR_GETADDRESS_IO_API_KEY')}
            apiEndpoint={POSTCODE_SEARCH_ENDPOINT}
          />
          <StyledButton>Submit</StyledButton>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </>
      )}
    </Form>
  ))
