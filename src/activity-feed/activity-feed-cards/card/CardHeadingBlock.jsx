import React from 'react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { BLUE, GREY_1 } from 'govuk-colours'
import { H3 } from 'govuk-react'
import PropTypes from 'prop-types'

const BlockHeading = styled(H3)`
  display: inline-block;
  font-weight: normal;
  color: white;
  padding: 2px 5px;
  background-color: ${({ sourceType }) => {
    if (sourceType && sourceType === 'externalDataSource') {
      return GREY_1
    } else {
      return BLUE
    }
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

    return (
      <BlockHeading sourceType={sourceType}>{text}</BlockHeading>
    )
  }
}
