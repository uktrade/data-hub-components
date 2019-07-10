import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Adviser from './Adviser'
import PROPS from './props'

const StyledListItem = styled('li')`
  list-style-type: none;
`

export default class AdviserListItem extends React.PureComponent {
  static propTypes = {
    adviser: PropTypes.shape(PROPS).isRequired,
  }

  render() {
    const { adviser } = this.props

    return (
      <StyledListItem>
        <Adviser adviser={adviser} />
      </StyledListItem>
    )
  }
}
