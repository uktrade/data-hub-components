import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Paragraph from '@govuk-react/paragraph'
import Details from '@govuk-react/details'
import UnorderedList from '@govuk-react/unordered-list'
import ListItem from '@govuk-react/list-item'

import ButtonLink from '../../button-link/ButtonLink'
import StatusMessage from '../../status-message/StatusMessage'
import EntitySearch from '../EntitySearch'
import useDnbSearch from '../useDnbSearch'
import companySearchFixture from '../__fixtures__/company-search'
import FieldUneditable from '../../forms/elements/FieldUneditable'

const { transformCompanyRecord } = useDnbSearch('http://localhost:8000/v4/dnb/company-search')
const fixtures = companySearchFixture.results.map(transformCompanyRecord)

storiesOf('EntitySearch', module)
  .add('with entity list header', () => {
    return (
      <EntitySearch
        onEntityClick={action('EntitySearch.onEntityClick')}
        entities={fixtures}
        entityListHeader={(
          <StatusMessage>
            The search results below are verified company records from Dun & Bradstreet,
            an external and up to date source of company information.
          </StatusMessage>
        )}
      />
    )
  })
  .add('with entity list footer', () => {
    return (
      <EntitySearch
        onEntityClick={action('EntitySearch.onEntityClick')}
        entities={fixtures}
        entityListFooter={(
          <Details summary="I cannot find the company I am looking for">
            <Paragraph>Try improving your search by:</Paragraph>
            <UnorderedList>
              <ListItem>checking the company name for spelling errors</ListItem>
              <ListItem>making sure you selected the correct country</ListItem>
              <ListItem>adding a postcode to your search to narrow down the results</ListItem>
            </UnorderedList>
            <ButtonLink onClick={action('EntitySearch.onEntityClick')}>
              I still cannot find the company
            </ButtonLink>
          </Details>
        )}
      />
    )
  })
  .add('with preselected value', () => {
    return (
      <>
        <FieldUneditable legend="Country" name="dnbCountry" onChangeClick={action('FieldUneditable.onEntityClick')}>
          UK
        </FieldUneditable>
        <EntitySearch
          onEntityClick={action('EntitySearch.onEntityClick')}
          entities={fixtures}
        />
      </>
    )
  })
  .add('with error', () => {
    return (
      <EntitySearch
        onEntityClick={action('EntitySearch.onEntityClick')}
        error="Example error"
      />
    )
  })
  .add('with no results', () => {
    return (
      <EntitySearch
        onEntityClick={action('EntitySearch.onEntityClick')}
        entities={[]}
      />
    )
  })
