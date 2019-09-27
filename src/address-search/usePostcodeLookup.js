import axios from 'axios'
import pluralise from 'pluralise'

function usePostcodeLookup(apiEndpoint) {
  function createAddressCount(addresses) {
    const addressCount = `${pluralise.withCount(addresses.length, '% address', '% addresses')} found`
    return {
      address1: addressCount,
    }
  }

  return async function findAddress(postcode) {
    const { data } = await axios.get(`${apiEndpoint}/${postcode}`)
    const addressCount = createAddressCount(data)

    return [
      addressCount,
      ...data,
    ]
  }
}

export default usePostcodeLookup
