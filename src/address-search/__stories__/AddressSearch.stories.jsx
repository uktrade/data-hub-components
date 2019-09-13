import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import addressSearch from '../data-providers/AddressSearch'
import AddressSearchWithDataProvider from '../AddressSearchWithDataProvider'

const BASE_URL = 'https://api.getAddress.io/v2/uk'

addDecorator(withKnobs)

storiesOf('Address search', module)
  .add('Data Hub address search', () => {
    const API_KEY = text('API KEY', 'YOUR_GETADDRESS_IO_API_KEY')
    return (
      <AddressSearchWithDataProvider
        getAddress={addressSearch(BASE_URL, API_KEY)}
      />
    )
  })
