import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BLACK, GREY_1 } from 'govuk-colours'

const StyledMeta = styled('span')`
  color: ${BLACK};
`

const StyledText = styled('span')`
  color: ${GREY_1};
  `

function ItemMeta({ label, value }) {
  return (
    <StyledMeta>
      <StyledText>{label}</StyledText> {value}
    </StyledMeta>
  )
}

ItemMeta.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
}

ItemMeta.defaultProps = {
  label: null,
  value: null,
}

export default ItemMeta
