import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '@govuk-react/button'
import { SPACING } from '@govuk-react/constants'
import styled from 'styled-components'

import Form from '../Form'
import FieldAddress from '../FieldAddress'
import { setupSuccessMocks } from '../../../address-search/__mocks__/postcode-lookup'

const API_ENDPOINT = 'http://localhost:3000/api/postcodelookup'
const POSTCODE = 'SW1H 9AJ'

const StyledButton = styled(Button)`
  margin-top: ${SPACING.SCALE_3};
`

storiesOf('Forms', module)
  .add('FieldAddress - success', () => {
    setupSuccessMocks(`${API_ENDPOINT}/${POSTCODE}`, { delayResponse: 750 })
    return (
      <Form onSubmit={action('onSubmit')}>
        {form => (
          <>
            <FieldAddress
              country="United Kingdom"
              apiEndpoint={API_ENDPOINT}
            />
            <StyledButton>Submit</StyledButton>
            <pre>{JSON.stringify(form, null, 2)}</pre>
          </>
        )}
      </Form>
    )
  })
