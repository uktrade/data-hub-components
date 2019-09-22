import React from 'react'
import { storiesOf } from '@storybook/react'

import AddressSearch from '../AddressSearch'
import fixtures from '../__fixtures__/address-search-SW1H 9AJ'

storiesOf('AddressSearch', module)
  .add('with addresses', () => {
    return (
      <AddressSearch
        addressList={fixtures}
      />
    )
  })
  .add('without addresses', () => {
    return (
      <AddressSearch
        addressList={[]}
      />
    )
  })
  .add('with error', () => {
    return (
      <AddressSearch
        addressList={[]}
        error="Error!"
      />
    )
  })
