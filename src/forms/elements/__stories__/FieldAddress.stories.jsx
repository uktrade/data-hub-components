import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '@govuk-react/button'
import { SPACING } from '@govuk-react/constants'
import styled from 'styled-components'

import FormStateful from '../FormStateful'
import FieldAddress from '../FieldAddress'
import { setupPostcodeMock200 } from '../../../address-search/__mocks__/postcode-lookup'

const API_ENDPOINT = 'http://localhost:3000/api/postcodelookup'
const POSTCODE = 'SW1H 9AJ'

const StyledButton = styled(Button)`
  margin-top: ${SPACING.SCALE_3};
`

storiesOf('Forms', module).add('FieldAddress', () => {
  setupPostcodeMock200(`${API_ENDPOINT}/${POSTCODE}`, { delayResponse: 750 })
  return (
    <FormStateful onSubmit={action('onSubmit')}>
      {(form) => (
        <>
          <FieldAddress
            legend="Address"
            name="address"
            hint="Type 'SW1H 9AJ' to get results, otherwise you will get an error."
            country={{
              id: '80756b9a-5d95-e211-a939-e4115bead28a',
              name: 'United Kingdom',
            }}
            apiEndpoint={API_ENDPOINT}
          />
          <StyledButton>Submit</StyledButton>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </>
      )}
    </FormStateful>
  )
})
