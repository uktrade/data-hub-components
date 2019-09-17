import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { WIDTHS } from '@govuk-react/constants'

import UnorderedList from '@govuk-react/unordered-list'
import Details from '@govuk-react/details'
import Button from '@govuk-react/button'
import Paragraph from '@govuk-react/paragraph'
import ListItem from '@govuk-react/list-item'
import LoadingBox from '@govuk-react/loading-box'
import { Search } from '@govuk-react/icons'

import useFormContext from '../hooks/useFormContext'
import StatusMessage from '../../status-message/StatusMessage'
import FieldWrapper from './FieldWrapper'
import FieldUneditable from './FieldUneditable'
import FieldInput from './FieldInput'
import ButtonLink from '../../button-link/ButtonLink'
import useEntitySearch from '../../entity-search/useEntitySearch'
import useDnbSearch from '../../entity-search/useDnbSearch'
import EntitySearch from '../../entity-search/EntitySearch'
import FormActions from './FormActions'

const FieldDnbCompany = ({
  name,
  label,
  legend,
  hint,
  country,
  apiEndpoint,
  queryParams,
}) => {
  const { values, goBack, goForward, validateForm, setFieldValue } = useFormContext()
  const { findCompany } = useDnbSearch(apiEndpoint)
  const { onEntitySearch, isSubmitting, error, entities } = useEntitySearch(findCompany)

  function onSearchClick(e) {
    e.preventDefault()
    const noValidationErrors = isEmpty(validateForm())
    if (noValidationErrors) {
      return onEntitySearch({
        ...queryParams,
        search_term: values.dnbCompanyName,
        postal_code: values.dnbPostalCode,
      })
    }
    return null
  }

  function onEntityClick(entity) {
    if (!entity.datahub_company) {
      setFieldValue('cannotFind', false)
      setFieldValue(name, entity.dnb_company)
      goForward()
    }
  }

  return (
    <LoadingBox timeOut={0} loading={isSubmitting}>
      <FieldWrapper {...({ name, label, legend, hint })}>
        {country && (
          <FieldUneditable legend="Country" name="dnbCountry" onChangeClick={goBack}>
            {country}
          </FieldUneditable>
        )}

        <FieldInput
          label="Company name"
          name="dnbCompanyName"
          type="search"
          required="Enter company name"
        />

        <FieldInput
          label="Company postcode (optional)"
          name="dnbPostalCode"
          style={{ width: WIDTHS['one-third'] }}
          type="search"
        />

        <FormActions>
          <Button icon={<Search />} onClick={onSearchClick}>Find company</Button>
        </FormActions>

        <EntitySearch
          error={error}
          entities={entities}
          onEntityClick={onEntityClick}
          entityListHeader={(
            <StatusMessage>
              The search results below are verified company records from Dun & Bradstreet,
              an external and up to date source of company information.
            </StatusMessage>
          )}
          entityListFooter={(
            <Details summary="I cannot find the company I am looking for">
              <Paragraph>Try improving your search by:</Paragraph>
              <UnorderedList>
                <ListItem>checking the company name for spelling errors</ListItem>
                <ListItem>making sure you selected the correct country</ListItem>
                <ListItem>adding a postcode to your search to narrow down the results</ListItem>
              </UnorderedList>
              <ButtonLink
                onClick={() => {
                  setFieldValue('cannotFind', true)
                  goForward()
                }}
              >
                I still cannot find the company
              </ButtonLink>
            </Details>
          )}
        />
      </FieldWrapper>
    </LoadingBox>
  )
}

FieldDnbCompany.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  legend: PropTypes.string,
  hint: PropTypes.string,
  country: PropTypes.string,
  apiEndpoint: PropTypes.string.isRequired,
  queryParams: PropTypes.shape({}),
}

FieldDnbCompany.defaultProps = {
  label: null,
  legend: null,
  hint: null,
  country: null,
  queryParams: {},
}

export default FieldDnbCompany
