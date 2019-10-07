import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CardHeaderContainer = styled('div')`
  display: flex;
  flex-flow: row wrap;
`

export default class CardContent extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props

    return <CardHeaderContainer>{children}</CardHeaderContainer>
  }
}
