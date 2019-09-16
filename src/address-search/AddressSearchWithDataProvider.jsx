import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import AddressSearch from './AddressSearch'

const ERROR_MSG_400 = 'Enter a valid postcode'
const ERROR_MSG_500 = 'An error occurred while searching for an address'

const AddressSearchWithDataProvider = ({ getAddress }) => {
  const [addressList, setAddressList] = useState(null)
  const [error, setError] = useState(null)
  const [postcode, setPostcode] = useState(null)

  const getAddressList = async () => {
    setError(null)
    setAddressList(null)

    try {
      setAddressList(await getAddress(postcode))
    } catch ({ response }) {
      setError(response.status === 400 ? ERROR_MSG_400 : ERROR_MSG_500)
    }
  }

  useEffect(() => {
    if (postcode) {
      getAddressList()
    }
  }, [postcode])

  return (
    <AddressSearch
      addressList={addressList}
      error={error}
      onAddressSearch={setPostcode}
    />
  )
}

AddressSearchWithDataProvider.propTypes = {
  getAddress: PropTypes.func.isRequired,
}

export default AddressSearchWithDataProvider
