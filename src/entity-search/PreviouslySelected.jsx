import React from 'react'
import PropTypes from 'prop-types'
import Link from '@govuk-react/link'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

const StyledLink = styled(Link)`
  margin-left: ${SPACING.SCALE_2};
`

const PreviouslySelected = ({ text, onChangeClick }) => {
  const onClick = (e) => {
    e.preventDefault()
    onChangeClick()
  }

  return (
    <p>
      {text}
      <StyledLink href="#previously-selected" onClick={onClick}>Change</StyledLink>
    </p>
  )
}

PreviouslySelected.propTypes = {
  text: PropTypes.string.isRequired,
  onChangeClick: PropTypes.func.isRequired,
}

export default PreviouslySelected
