import React from 'react'
import styled from 'styled-components'
import {SPACING} from '@govuk-react/constants'

const CardContainer = styled('div')`
  border: ${({isUpcoming}) => isUpcoming ? '1px dashed #c0c0c0' : '1px solid #c0c0c0'};
  padding: ${SPACING.SCALE_3};
  display: flex;
  flex-flow: row wrap;
`

export default class Card extends React.Component {
  render() {
    const { isUpcoming, children } = this.props

    return (
      <CardContainer isUpcoming={isUpcoming}>
        {children}
      </CardContainer>
    )
  }
}
