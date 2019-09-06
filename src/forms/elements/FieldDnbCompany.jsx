import React from 'react'
import PropTypes from 'prop-types'

import FormGroup from '@govuk-react/form-group'
import useFormContext from '../hooks/useFormContext'
import EntitySearchWithDataProvider from '../../entity-search/EntitySearchWithDataProvider'
import dnbCompanySearchDataProvider from '../../entity-search/data-providers/DnbCompanySearch'

const FieldDnbCompany = ({
  name,
  label,
  country,
  apiEndpoint,
}) => {
  const { goBack, goForward, setFieldValue } = useFormContext()

  return (
    <FormGroup>
      <label htmlFor={name}>{label}</label>

      <EntitySearchWithDataProvider
        getEntities={dnbCompanySearchDataProvider(apiEndpoint)}
        previouslySelected={{
          text: `Based in the ${country}`,
          onChangeClick: goBack,
        }}
        entityFilters={[
          [
            {
              label: 'Company name',
              key: 'search_term',
            },
          ],
          [
            {
              label: 'Company postcode',
              key: 'postal_code',
              width: 'one-half',
              optional: true,
            },
          ],
        ]}
        cannotFind={{
          summary: 'I cannot find the company I am looking for',
          actions: [
            'Check the country selected is correct',
            'Check for spelling errors in the company name',
            'Remove or add Ltd or Limited to your search',
          ],
          link: {
            text: 'I still cannot find the company',
            url: 'http://stillcannotfind.com',
          },
        }}
        onEntityClick={(entity) => {
          if (!entity.datahub_company) {
            setFieldValue(name, entity.dnb_company)
            goForward()
          }
        }}
      />
    </FormGroup>
  )
}

FieldDnbCompany.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
}

export default FieldDnbCompany
