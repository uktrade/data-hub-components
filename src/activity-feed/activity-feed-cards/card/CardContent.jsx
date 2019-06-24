import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CardContentContainer = styled('div')`
  flex: 50%;
`

export default class CardContent extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props

    return (
      <CardContentContainer>
        {children}
      </CardContentContainer>
    )
  }
}
