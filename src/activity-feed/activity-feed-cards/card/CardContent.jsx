import React from 'react'
import styled from 'styled-components'

const CardContentContainer = styled('div')`
  flex: 50%;
`

export default class CardContent extends React.Component {
  render() {
    const { children } = this.props

    return (
      <CardContentContainer>
        {children}
      </CardContentContainer>
    )
  }
}
