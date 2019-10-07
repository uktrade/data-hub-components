import React from 'react'
import styled from 'styled-components'
import { H2 } from '@govuk-react/heading'
import Link from '@govuk-react/link'
import Select from '@govuk-react/select'
import useMyCompaniesContext from './useMyCompaniesContext'
import { LIST_CHANGE } from './constants'

const StyledRoot = styled.div`
  display: flex;
  align-items: baseline;
`

const StyledHedline = styled(H2)`
  flex-grow: 1;
`

const StyledListName = styled.div`
  margin-right: 10px;
`

const StyledSelect = styled(Select)`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-right: 10px;
  span {
    margin-right: 10px;
  }
  // The underlying select has for some reason witdh 50%
  select {
    width: initial;
    min-width: 200px;
  }
`

export default () => {
  const { state: { lists }, dispatch } = useMyCompaniesContext()
  return (
    <StyledRoot>
      <StyledHedline>
        My companies list
      </StyledHedline>
      {lists.length
        ? (
          <>
            {lists.length === 1
              ? (
                <StyledListName as="h3">
                  {lists[0].name}
                </StyledListName>
              )
              : (
                <>
                  <StyledSelect
                    label="View list"
                    input={{
                      onChange: e => dispatch({
                        type: LIST_CHANGE,
                        idx: e.target.value,
                      }),
                    }}
                  >
                    {/* eslint-disable react/no-array-index-key */}
                    {lists.map(({ name }, idx) => (
                      <option key={idx} value={idx}>
                        {name}
                      </option>
                    ))}
                  </StyledSelect>
                </>
              )
            }
            <Link href="#foo">
              Edit lists
            </Link>
          </>
        )
        : null
      }
    </StyledRoot>
  )
}
