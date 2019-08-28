/* eslint-disable camelcase */
import React from 'react'
import axios from 'axios'
import { compact, join } from 'lodash'

export default (apiEndpoint) => {
  return async (filters) => {
    const { data } = await axios.post(apiEndpoint, filters)

    return data.results.map((result) => {
      const { dnb_company, datahub_company } = result

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
        text: datahub_company ? (
          <>
            This company is already on Data Hub.&nbsp;
            <a href={`/companies/${datahub_company.id}`}>Go to the company page</a>&nbsp;
            to record activity.
          </>
        ) : null,
        canHandleClick: !datahub_company,
        data: result,
      }
    })
  }
}
