import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FONT_SIZE, MEDIA_QUERIES, SPACING } from '@govuk-react/constants'


const ItemMetaWrapper = styled('div')`
font-size: ${FONT_SIZE.SIZE_16};
line-height: ${FONT_SIZE.SIZE_27};
margin: ${SPACING.SCALE_2} 0;
display: grid;

${MEDIA_QUERIES.TABLET} {
margin-top: -${SPACING.SCALE_3};
}
`

ItemMetaWrapper.propTypes = {
  children: PropTypes.node,
}

ItemMetaWrapper.defaultProps = {
  children: null,
}

export default ItemMetaWrapper
