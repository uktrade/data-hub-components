import { orderBy } from 'lodash'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import LinesEllipsis from 'react-lines-ellipsis'
import { typography } from '@govuk-react/lib'
import Table from '@govuk-react/table'
import Link from '@govuk-react/link'
import { GREY_1 } from 'govuk-colours'
import { MEDIA_QUERIES } from '@govuk-react/constants'
import useMyCompaniesContext from './useMyCompaniesContext'
import Filters from './MyCompaniesFilters'

const StyledCellHeader = styled(Table.CellHeader)(
  typography.font({ size: 14, weight: 'bold' }),
  {
    [MEDIA_QUERIES.DESKTOP]: {
      overflow: 'hidden',
      'white-space': 'nowrap',
    },
  }
)

const StyledDateCell = styled(Table.Cell)(typography.font({ size: 14 }), {
  color: GREY_1,
  'text-align': 'center',
})

export function sortCompanies(companies, sortType) {
  const sort = {
    recent: orderBy(companies, [c => c.latestInteraction.date || ''], ['desc']),
    'least-recent': orderBy(companies, [c => c.latestInteraction.date || ''], ['asc']),
    alphabetical: orderBy(companies, [c => c.company.name], ['asc']),
  }
  return sort[sortType]
}

export const filterCompanyName = (companies, filterText) => (filterText.length
  ? companies.filter(c => c.company.name.toLowerCase().includes(filterText.toLowerCase()))
  : companies)

function MyCompaniesTable() {
  const { state: { lists, selectedIdx, sortBy, filter } } = useMyCompaniesContext()
  const list = lists[selectedIdx]
  const filteredSortedCompanies = sortCompanies(
    filterCompanyName(list.companies, filter),
    sortBy,
  )

  const header = (
    <Table.Row>
      <StyledCellHeader>Company name</StyledCellHeader>
      <StyledCellHeader>Last interaction</StyledCellHeader>
      <StyledCellHeader>&nbsp;</StyledCellHeader>
    </Table.Row>
  )

  const rows = filteredSortedCompanies.map(({ company, latestInteraction }) => {
    return (
      <Table.Row key={company.id}>
        <Table.Cell>
          <Link href={`companies/${company.id}`}>
            <LinesEllipsis
              text={company.name}
              maxLine="2"
              ellipsis="..."
              trimRight={true}
              basedOn="words"
            />
          </Link>
        </Table.Cell>
        <StyledDateCell>
          {latestInteraction.date
            ? moment(latestInteraction.date).format('D MMM YYYY')
            : '-'
          }
        </StyledDateCell>
        <Table.Cell>
          {latestInteraction.id ? (
            <Link href={`interactions/${latestInteraction.id}`}>
              <LinesEllipsis
                text={latestInteraction.subject}
                maxLine="2"
                ellipsis="..."
                trimRight={true}
                basedOn="words"
              />
            </Link>
          ) : (
            latestInteraction.subject
          )}
        </Table.Cell>
      </Table.Row>
    )
  })

  return (
    <>
      {list.companies.length > 1 && <Filters />}
      <Table head={header}>{rows}</Table>
    </>
  )
}

export default MyCompaniesTable
