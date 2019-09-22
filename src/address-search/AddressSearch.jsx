import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@govuk-react/button'
import Select from '@govuk-react/select'
import Input from '@govuk-react/input'
import { Search } from '@govuk-react/icons'
import styled from 'styled-components'
import { GREY_3, BLACK } from 'govuk-colours'

import FieldWrapper from '../forms/elements/FieldWrapper'

const UNKNOWN = 'unknown'

const StyledInput = styled(Input)`
  width: 165px;
`

const AddressSearch = ({
  error,
  addressList,
  onAddressSearch,
  onAddressSelect,
}) => {
  const [postCode, setPostCode] = useState(null)
  const [address, setAddress] = useState(null)

  const onAddressSearchBtnClick = (evt) => {
    evt.preventDefault()
    setAddress(null)
    onAddressSelect({})
    onAddressSearch(postCode || UNKNOWN)
  }

  const onAddressChange = (evt) => {
    setAddress(addressList[evt.target.selectedIndex])
    onAddressSelect(addressList[evt.target.selectedIndex])
  }

  return (
    <>
      <FieldWrapper name="postcode" label="Postcode">
        <StyledInput
          error={error}
          input={{
            id: 'postcode',
            name: 'postcode',
            type: 'text',
          }}
          onChange={evt => setPostCode(evt.target.value)}
        />
      </FieldWrapper>

      <Button
        onClick={onAddressSearchBtnClick}
        buttonColour={GREY_3}
        buttonTextColour={BLACK}
        icon={<Search />}
      >
        Find UK address
      </Button>

      {(addressList && addressList.length > 0) && (
        <FieldWrapper name="address" label="Select an address">
          <Select
            value={address}
            onChange={onAddressChange}
          >
            {addressList.map(({ id, address1 }, index) => {
              return <option key={id} value={index}>{ address1 }</option>
            })}
          </Select>
        </FieldWrapper>
      )}
    </>
  )
}

AddressSearch.propTypes = {
  error: PropTypes.string,
  addressList: PropTypes.array,
  onAddressSearch: PropTypes.func.isRequired,
  onAddressSelect: PropTypes.func.isRequired,
}

AddressSearch.defaultProps = {
  error: null,
  addressList: null,
}

export default AddressSearch
