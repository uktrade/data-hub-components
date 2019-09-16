import React from 'react'
import PropTypes from 'prop-types'

import useFormContext from '../hooks/useFormContext'
import AddressSearchWithDataProvider from '../../address-search/AddressSearchWithDataProvider'
import addressSearch from '../../address-search/data-providers/AddressSearch'
import FieldInput from './FieldInput'
import FieldUneditable from './FieldUneditable'

const UNITED_KINGDOM = 'United Kingdom'

const FieldAddress = ({
  country,
  apiKey,
  apiEndpoint,
}) => {
  const { setFieldValue } = useFormContext()
  const isUK = country === UNITED_KINGDOM

  function onAddressSelect(address) {
    setFieldValue('postcode', address.postcode)
    setFieldValue('address1', address.address1)
    setFieldValue('address2', address.address2)
    setFieldValue('townOrCity', address.townOrCity)
    setFieldValue('county', address.county)
    setFieldValue('country', country)
  }

  return (
    <fieldset>
      <legend>Address</legend>
      <p>
        This should be the address for this particular office of the company.
        If you need to record activity or a contact for a different address,
        please add a new company record to Data Hub.
      </p>
      {isUK && (
        <AddressSearchWithDataProvider
          getAddress={addressSearch(apiEndpoint, apiKey)}
          onAddressSelect={onAddressSelect}
        />
      )}
      <FieldInput type="text" name="address1" label="Address line 1" required="Enter address line 1" />
      <FieldInput type="text" name="address2" label="Address line 2 (optional)" />
      <FieldInput type="text" name="townOrCity" label="Town or city" required="Enter town or city" />
      <FieldInput type="text" name="county" label="County (optional)" />
      {!isUK && (
        <FieldInput type="text" name="postcode" label="Postcode (optional)" />
      )}
      <FieldUneditable name="country" label="Country">{ country }</FieldUneditable>
    </fieldset>
  )
}

FieldAddress.propTypes = {
  country: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
}

export default FieldAddress
