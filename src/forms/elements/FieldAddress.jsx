import React from 'react'
import PropTypes from 'prop-types'
import LoadingBox from '@govuk-react/loading-box'

import useFormContext from '../hooks/useFormContext'
import AddressSearch from '../../address-search/AddressSearch'
import useAddressSearch from '../../address-search/useAddressSearch'
import postcodeLookup from '../../address-search/PostcodeLookup'
import FieldInput from './FieldInput'
import FieldUneditable from './FieldUneditable'

const UNITED_KINGDOM = 'United Kingdom'

const FieldAddress = ({
  country,
  apiEndpoint,
}) => {
  const {
    onAddressSearch,
    isSubmitting,
    error,
    addressList,
  } = useAddressSearch(postcodeLookup(apiEndpoint))

  const { setFieldValue } = useFormContext()
  const isUK = country.name === UNITED_KINGDOM

  function onAddressSelect(address) {
    setFieldValue('postcode', address.postcode)
    setFieldValue('address1', address.address1)
    setFieldValue('address2', address.address2)
    setFieldValue('city', address.city)
    setFieldValue('county', address.county)
    setFieldValue('country', address.country.id)
  }

  return (
    <LoadingBox timeOut={0} loading={isSubmitting}>
      <fieldset>
        <legend>Address</legend>
        <p>
          This should be the address for this particular office of the company.
          If you need to record activity or a contact for a different address,
          please add a new company record to Data Hub.
        </p>
        {isUK && (
          <AddressSearch
            error={error}
            addressList={addressList}
            onAddressSearch={onAddressSearch}
            onAddressSelect={onAddressSelect}
          />
        )}
        <FieldInput type="text" name="address1" label="Address line 1" required="Enter address line 1" />
        <FieldInput type="text" name="address2" label="Address line 2 (optional)" />
        <FieldInput type="text" name="city" label="Town or city" required="Enter town or city" />
        <FieldInput type="text" name="county" label="County (optional)" />
        {!isUK && (
          <FieldInput type="text" name="postcode" label="Postcode (optional)" />
        )}
        <FieldUneditable name="country" label="Country">{country.name}</FieldUneditable>
      </fieldset>
    </LoadingBox>
  )
}

FieldAddress.propTypes = {
  country: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  apiEndpoint: PropTypes.string.isRequired,
}

export default FieldAddress
