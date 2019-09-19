import styled from 'styled-components'
import PropTypes from 'prop-types'
import { SPACING } from '@govuk-react/constants'
import { GREY_2 } from 'govuk-colours'

const Item = styled('div')`
    border-bottom: 2px solid ${GREY_2};
    padding: ${SPACING.SCALE_2};
  `

Item.propTypes = {
  children: PropTypes.node,
}

Item.defaultProps = {
  children: null,
}

export default Item
