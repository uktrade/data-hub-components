import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import useDnbSearch from '../useDnbSearch'
import companySearchFixture from '../__fixtures__/company-search'
import EntityList from '../EntityList'

const { transformCompanyRecord } = useDnbSearch('http://localhost:8000/v4/dnb/company-search')
const fixtures = companySearchFixture.results.map(transformCompanyRecord)

storiesOf('EntitySearch', module)
  .add('EntityList - DnB', () => (
    <EntityList
      onEntityClick={action('EntitySearch.onEntityClick')}
      entities={fixtures}
    />
  ))
