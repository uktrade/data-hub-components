import styled from 'styled-components'
import PropTypes from 'prop-types'
import { SPACING, FONT_SIZE, MEDIA_QUERIES } from '@govuk-react/constants'

const ItemBadgeWrapper = styled('div')`
  width: 100%;
  margin-bottom: ${SPACING.SCALE_1};
  font-size: ${FONT_SIZE.SIZE_16};
  padding-top: ${SPACING.SCALE_1};
  display: inline-table;

  ${MEDIA_QUERIES.TABLET} {
    width: 200px;
    text-align: right;
  }
`

ItemBadgeWrapper.propTypes = {
  children: PropTypes.node,
}

ItemBadgeWrapper.defaultProps = {
  children: null,
}

export default ItemBadgeWrapper
