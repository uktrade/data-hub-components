import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import styled from 'styled-components'

import { WIDTHS, SPACING } from '@govuk-react/constants'
import { Search } from '@govuk-react/icons'
import UnorderedList from '@govuk-react/unordered-list'
import Details from '@govuk-react/details'
import Button from '@govuk-react/button'
import Paragraph from '@govuk-react/paragraph'
import ListItem from '@govuk-react/list-item'

import useFormContext from '../hooks/useFormContext'
import StatusMessage from '../../status-message/StatusMessage'
import FieldWrapper from './FieldWrapper'
import FieldUneditable from './FieldUneditable'
import FieldInput from './FieldInput'
import ButtonLink from '../../button-link/ButtonLink'
import useEntitySearch from '../../entity-search/useEntitySearch'
import useDnbSearch from '../../entity-search/useDnbSearch'
import FormActions from './FormActions'
import EntityList from '../../entity-search/EntityList'

const StyledUnorderedList = styled(UnorderedList)`
  list-style-type: disc;
  padding-left: ${SPACING.SCALE_5};
`

const FieldDnbCompany = ({
  name,
  label,
  legend,
  hint,
  country,
  apiEndpoint,
  queryParams,
  entityRenderer,
  onCannotFind,
}) => {
  const { values, goBack, validateForm, setIsLoading } = useFormContext()
  const { findCompany } = useDnbSearch(apiEndpoint)
  const {
    onEntitySearch,
    searching,
    searched,
    error,
    entities,
  } = useEntitySearch(findCompany)

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

  useEffect(() => setIsLoading(searching), [searching])

  return (
    <FieldWrapper {...{ name, label, legend, hint }}>
      {country && (
        <FieldUneditable
          legend="Country"
          name="dnbCountry"
          onChangeClick={goBack}
        >
          {country}
        </FieldUneditable>
      )}

      <FieldInput
        label="Company name"
        name="dnbCompanyName"
        type="search"
        required="Enter company name"
        validate={(value) =>
          value && value.length < 2
            ? 'Enter company name that is 2 characters long or more'
            : null
        }
        maxLength={30}
      />

      <FieldInput
        label="Company postcode (optional)"
        name="dnbPostalCode"
        style={{ width: WIDTHS['one-third'] }}
        type="search"
      />

      <FormActions>
        <Button icon={<Search />} onClick={onSearchClick}>
          Find company
        </Button>
      </FormActions>

      {searched && (
        <>
          {entities.length > 0 && (
            <>
              <StatusMessage>
                The search results below are verified company records from an
                external and verified source of company information.
              </StatusMessage>

              <EntityList entities={entities} entityRenderer={entityRenderer} />
            </>
          )}

          {!error && entities.length === 0 && (
            <StatusMessage>There are no companies to show.</StatusMessage>
          )}

          {error && (
            <StatusMessage>
              Error occurred while searching for company.
            </StatusMessage>
          )}

          <Details summary="I can't find what I'm looking for">
            <Paragraph>Try:</Paragraph>

            <StyledUnorderedList>
              <ListItem>checking for spelling errors</ListItem>
              {country && (
                <ListItem>checking if the right country was selected</ListItem>
              )}
              <ListItem>
                check you&apos;re using the company&apos;s registered name
              </ListItem>
              <ListItem>checking or removing the postcode</ListItem>
              <ListItem>
                removing &quot;limited&quot; or &quot;ltd&quot;
              </ListItem>
            </StyledUnorderedList>

            {onCannotFind && (
              <ButtonLink onClick={onCannotFind}>
                I still can&apos;t find what I&apos;m looking for
              </ButtonLink>
            )}
          </Details>
        </>
      )}
    </FieldWrapper>
  )
}

FieldDnbCompany.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  legend: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hint: PropTypes.string,
  country: PropTypes.string,
  apiEndpoint: PropTypes.string.isRequired,
  queryParams: PropTypes.shape({}),
  entityRenderer: PropTypes.func,
  onCannotFind: PropTypes.func,
}

FieldDnbCompany.defaultProps = {
  label: null,
  legend: null,
  hint: null,
  country: null,
  queryParams: {},
  entityRenderer: undefined,
  onCannotFind: null,
}

export default FieldDnbCompany
