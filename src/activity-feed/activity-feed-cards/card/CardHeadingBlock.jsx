import React from 'react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { H3 } from 'govuk-react'
import PropTypes from 'prop-types'

const BlockHeading = styled(H3)`
  display: inline-block;
  font-weight: normal;
  color: white;
  padding: 2px 5px;
  background-color: #005ea5;
  margin-bottom: ${SPACING.SCALE_2};
`

export default class CardBlockHeading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    const { text } = this.props

    return (
      <BlockHeading>{text}</BlockHeading>
    )
  }
}
