import React from 'react'
import styled from 'styled-components'
import Select from '@govuk-react/select'
import useMyCompaniesContext from './useMyCompaniesContext'
import { LIST_CHANGE } from './constants'

const Root = styled.div`
  display: flex;
  align-items: baseline;
`

const Headline = styled.h2`
  flex-grow: 1;
`

const RightSideItem = styled.div`
  margin-right: 10px;
`

const StyledSelect = styled(Select)`
  display: inline-block;
  margin-right: 10px;
  // The underlying select has for some reason witdh 50%
  select {
    width: initial;
  }
`

const ListSelector = () => {
  const { state: { lists }, dispatch } = useMyCompaniesContext()

  return (
    <Root>
      <Headline>
        My companies list
      </Headline>
      {lists.length
        ? (
          <>
            {lists.length === 1
              ? (
                <RightSideItem as="h3">
                  {lists[0].name}
                </RightSideItem>
              )
              : (
                <>
                  <RightSideItem as="span">
                    View lists
                  </RightSideItem>
                  <StyledSelect
                    input={{
                      onChange: e => dispatch({
                        type: LIST_CHANGE,
                        idx: e.target.value,
                      }),
                    }}
                  >
                    {/* TODO: Sort lists alphabetically */}
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
            <a href="#foo">
              Edit lists
            </a>
          </>
        )
        : null
      }
    </Root>
  )
}

export default ListSelector
