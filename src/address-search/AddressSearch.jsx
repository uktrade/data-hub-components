import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@govuk-react/button'
import Select from '@govuk-react/select'
import InputField from '@govuk-react/input-field'

const UNKNOWN = 'unknown'

const AddressSearch = ({
  error,
  addressList,
  onAddressSearch,
}) => {
  const [postCode, setPostCode] = useState(null)

  const onAddressSearchClick = (evt) => {
    evt.preventDefault()
    onAddressSearch(postCode || UNKNOWN)
  }

  return (
    <>
      <div>
        <InputField
          name="postcode"
          type="text"
          error={error}
          onChange={evt => setPostCode(evt.target.value)}
        />
        <Button onClick={onAddressSearchClick}>Find UK Address</Button>
      </div>
      { addressList && (
        <Select name="address" label="Select an address">
          {
            addressList.map((value, index) => {
              return <option key={value.id} value={index}>{ value.address1 }</option>
            })
          }
        </Select>
      )}

      {error && <p>{error}</p>}
    </>
  )
}

AddressSearch.propTypes = {
  error: PropTypes.string,
  addressList: PropTypes.array,
  onAddressSearch: PropTypes.func.isRequired,
}

AddressSearch.defaultProps = {
  error: null,
  addressList: null,
}

export default AddressSearch
