import React from 'react'
import PropTypes from 'prop-types'
import useFormContext from '../hooks/useFormContext'
import EntitySearchWithDataProvider from '../../entity-search/EntitySearchWithDataProvider'
import dnbCompanySearchDataProvider from '../../entity-search/data-providers/DnbCompanySearch'
import StatusMessage from '../../status-message/StatusMessage'
import FieldWrapper from './FieldWrapper'

const FieldDnbCompany = ({
  name,
  label,
  legend,
  hint,
  country,
  apiEndpoint,
}) => {
  const { goBack, goForward, setFieldValue } = useFormContext()

  return (
    <FieldWrapper {...({ name, label, legend, hint })}>
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
            'checking the company name for spelling errors',
            'making sure you selected the correct country',
            'adding a postcode to your search to narrow down the results',
          ],
          link: {
            text: 'I still cannot find the company',
            onClick: () => {
              setFieldValue('cannotFind', true)
              goForward()
            },
          },
        }}
        onEntityClick={(entity) => {
          if (!entity.datahub_company) {
            setFieldValue('cannotFind', false)
            setFieldValue(name, entity.dnb_company)
            goForward()
          }
        }}
        entityListHeader={(
          <StatusMessage>
            The search results below are verified company records from Dun & Bradstreet,
            an external and up to date source of company information.
          </StatusMessage>
        )}
      />
    </FieldWrapper>
  )
}

FieldDnbCompany.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  legend: PropTypes.string,
  hint: PropTypes.string,
  country: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
}

FieldDnbCompany.defaultProps = {
  label: null,
  legend: null,
  hint: null,
}

export default FieldDnbCompany
