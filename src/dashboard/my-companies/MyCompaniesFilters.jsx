import React from 'react'
import styled from 'styled-components'
import { SelectInput } from '@govuk-react/select'
import LabelText from '@govuk-react/label-text'
import { MEDIA_QUERIES, SPACING } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import useMyCompaniesContext from './useMyCompaniesContext'
import { FILTER_CHANGE, ORDER_CHANGE } from './constants'

const StyledSelectInput = styled(SelectInput)(typography.font({ size: 14 }), {
  [MEDIA_QUERIES.LARGESCREEN]: {
    width: 'auto',
  },
})

const StyledLabelText = styled(LabelText)(typography.font({ size: 14 }))

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledSearch = styled.input`
  margin-right: ${SPACING.SCALE_2};
  padding-right: ${SPACING.SCALE_1};
  padding-left: ${SPACING.SCALE_1};
`

function MyCompaniesFilters() {
  const { dispatch } = useMyCompaniesContext()

  return (
    <StyledContainer>
      <StyledSearch
        type="text"
        placeholder="Search list"
        onChange={e => dispatch({
          type: FILTER_CHANGE,
          filter: e.target.value,
        })}
      />
      <StyledLabelText>
        Sort By:{' '}
        <StyledSelectInput
          onChange={e => dispatch({
            type: ORDER_CHANGE,
            sortBy: e.target.value,
          })}
        >
          <option value="recent">Recent interaction</option>
          <option value="least-recent">Least recent interaction</option>
          <option value="alphabetical">Company name A-Z</option>
        </StyledSelectInput>
      </StyledLabelText>
    </StyledContainer>
  )
}

export default MyCompaniesFilters
