/* eslint-disable camelcase */
import axios from 'axios'
import {
  map,
  trim,
  pickBy,
  isEmpty,
  isNil,
  join,
  compact,
} from 'lodash'

const addressObjToString = (address) => {
  return join(compact([
    address.address1,
    address.address2,
    address.townOrCity,
    address.county,
    address.postcode,
  ]), ', ')
}

const transformAddress = (address, postcode) => {
  const addressParts = map(address.split(','), adrs => trim(adrs))
  const parsed = pickBy({
    postcode,
    county: isEmpty(addressParts[5]) || isEmpty(addressParts[6]) ? null : addressParts[6],
    townOrCity: isEmpty(addressParts[5]) ? addressParts[6] : addressParts[5],
    address1: isEmpty(addressParts[2]) ? addressParts[0] : `${addressParts[0]}${' - '}${addressParts[1]}`,
    address2: isEmpty(addressParts[2]) ? addressParts[1] : addressParts[2],
  }, value => !isNil(value) && !isEmpty(value))

  return {
    ...parsed,
    id: addressObjToString(parsed),
  }
}

export default (baseUrl, apiKey) => {
  return async (postcode) => {
    const { data } = await axios.get(`${baseUrl}/${postcode}?api-key=${apiKey}`)
    return map(data.Addresses, address => transformAddress(address, postcode))
  }
}
