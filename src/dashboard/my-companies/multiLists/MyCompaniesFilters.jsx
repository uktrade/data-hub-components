import React, { useRef } from 'react'
import styled from 'styled-components'
import { SelectInput } from '@govuk-react/select'
import LabelText from '@govuk-react/label-text'
import { MEDIA_QUERIES, SPACING } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import ACTIONS from '../constants'
import useMyCompaniesContext from '../useMycompaniesListsContext'

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
  const { state, dispatch } = useMyCompaniesContext()
  const inputEl = useRef()

  const handleSelectChange = (e) => {
    dispatch({ type: ACTIONS.SORT_BY, sortType: e.target.value })
  }

  const handleInputChange = (e) => {
    dispatch({ type: ACTIONS.FILTER_BY, filterText: e.target.value })
  }

  return (
    <StyledContainer>
      <StyledSearch
        type="text"
        placeholder="Search list"
        onChange={handleInputChange}
        value={state.filterText}
        ref={inputEl}
      />
      <StyledLabelText>
        Sort By:{' '}
        <StyledSelectInput onChange={handleSelectChange} value={state.sortType}>
          <option value="recent">Recent interaction</option>
          <option value="least-recent">Least recent interaction</option>
          <option value="alphabetical">Company name A-Z</option>
        </StyledSelectInput>
      </StyledLabelText>
    </StyledContainer>
  )
}

export default MyCompaniesFilters
