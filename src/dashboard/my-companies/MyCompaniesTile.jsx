import React from 'react'
import HintText from '@govuk-react/hint-text'

import useMyCompaniesContext from './useMyCompaniesContext'
import MyCompaniesTable from './MyCompaniesTable'
import ListSelector from './ListSelector'

const EmptyListMsg = () => (
  <HintText>
    You have not added any companies to your list.
    <br />
    You can add companies to this list from a company page,
    and only you can see this list.
  </HintText>
)

const NoListsMsg = () => (
  <HintText>
    You have not yet created any lists with companies.
    <br />
    You can add companies to lists from a company page,
    and only you can see these lists.
  </HintText>
)

function MyCompaniesTile() {
  const { state: { lists, selectedIdx } } = useMyCompaniesContext()
  const hasLists = lists.length
  const list = lists[selectedIdx]
  const hasCompanies = list && list.companies && list.companies.length

  return (
    <div>
      <ListSelector />
      {/* eslint-disable no-nested-ternary */}
      {hasLists
        ? hasCompanies
          ? <MyCompaniesTable />
          : <EmptyListMsg />
        : <NoListsMsg />
      }
    </div>
  )
}

export default MyCompaniesTile
