import axios from 'axios/index'
import pluralise from 'pluralise'

const createAddressCount = (addresses) => {
  const addressCount = `${pluralise.withCount(addresses.length, '% address', '% addresses')} found`
  return {
    address1: addressCount,
    id: addressCount,
  }
}

export default (apiEndpoint) => {
  return async (postcode) => {
    const { data } = await axios.get(`${apiEndpoint}/${postcode}`)
    const addressAcount = createAddressCount(data)

    return [
      addressAcount,
      ...data,
    ]
  }
}
