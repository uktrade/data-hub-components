import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AdviserListItem from './AdviserListItem'
import PROPS from './props'

const StyledUList = styled('ul')`
  margin: 0;
  padding-left: 0
`

export default class AdvisersList extends React.PureComponent {
  static propTypes = {
    advisers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      ...PROPS,
    })).isRequired,
  }

  render() {
    const { advisers } = this.props

    return (
      <StyledUList>
        {
          advisers.map(adviser => <AdviserListItem key={adviser.id} adviser={adviser} />)
        }
      </StyledUList>
    )
  }
}
