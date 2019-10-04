import React from 'react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { BLUE, GREY_1 } from 'govuk-colours'
import { H3 } from '@govuk-react/heading'
import PropTypes from 'prop-types'
import { SOURCE_TYPES } from '../../constants'

const BlockHeading = styled(H3)`
  display: inline-block;
  font-weight: normal;
  color: white;
  padding: 2px 5px;
  background-color: ${({ sourceType }) => {
    return sourceType === SOURCE_TYPES.external ? GREY_1 : BLUE
  }};
  margin-bottom: ${SPACING.SCALE_2};
`

export default class CardBlockHeading extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    sourceType: PropTypes.string,
  }

  static defaultProps = {
    sourceType: null,
  }

  render() {
    const { text, sourceType } = this.props

    return <BlockHeading sourceType={sourceType}>{text}</BlockHeading>
  }
}
