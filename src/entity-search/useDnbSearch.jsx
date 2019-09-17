/* eslint-disable camelcase */

import React from 'react'
import axios from 'axios/index'
import { compact } from 'lodash'
import Link from '@govuk-react/link'

function useDnbSearch(apiEndpoint) {
  function transformCompanyRecord(record) {
    const { dnb_company, datahub_company } = record

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
      text: datahub_company && (
        <>
          This company is already on Data Hub.
          {' '}
          <Link href={`/companies/${datahub_company.id}`}>Go to the company page</Link> to record activity.
        </>
      ),
      canHandleClick: !datahub_company,
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
