import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FONT_SIZE } from '@govuk-react/constants'
import { GREY_2 } from 'govuk-colours'

const ItemBadge = styled('span')`
  border: 2px solid ${GREY_2};
  border-radius: 4px;
  padding: 2px 4px;
  margin: 2px;
  font-size: ${FONT_SIZE.SIZE_14};
  white-space: nowrap;
`

ItemBadge.propTypes = {
  children: PropTypes.string,
}

ItemBadge.defaultProps = {
  children: null,
}

export default ItemBadge
