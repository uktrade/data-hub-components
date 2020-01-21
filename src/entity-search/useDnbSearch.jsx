/* eslint-disable camelcase */

import axios from 'axios'
import { compact } from 'lodash'

function useDnbSearch(apiEndpoint) {
  function transformCompanyRecord(record) {
    const { dnb_company } = record

    return {
      id: dnb_company.duns_number,
      heading: dnb_company.primary_name,
      meta: {
        Address: compact([
          dnb_company.address_line_1,
          dnb_company.address_line_2,
          dnb_company.address_town,
          dnb_company.address_county,
          dnb_company.address_postcode,
        ]).join(', '),
      },
      data: record,
    }
  }

  async function findCompany(filters) {
    const { data } = await axios.post(apiEndpoint, filters)

    return data.results.map(transformCompanyRecord)
  }

  return {
    findCompany,
    transformCompanyRecord,
  }
}

export default useDnbSearch
