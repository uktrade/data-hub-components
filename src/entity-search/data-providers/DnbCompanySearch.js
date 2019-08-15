import axios from 'axios'
import { compact, join } from 'lodash'

export default (apiEndpoint) => {
  return async () => {
    const { data } = await axios.post(apiEndpoint)

    // eslint-disable-next-line camelcase
    return data.results.map(({ dnb_company }) => {
      return {
        heading: dnb_company.primary_name,
        meta: {
          Address: join(compact([
            dnb_company.address_line_1,
            dnb_company.address_line_2,
            dnb_company.address_town,
            dnb_company.address_county,
            dnb_company.address_postcode,
          ]), ', '),
        },
      }
    })
  }
}
