import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledListItem = styled('li')`
  list-style-type: none;
`

const StyledUList = styled('ul')`
  margin: 0;
  padding-left: 0;
`

export default class CardDetailsList extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemRenderer: PropTypes.any.isRequired,
    itemPropName: PropTypes.string,
  }

  static defaultProps = {
    itemPropName: null,
  }

  render() {
    const { items, itemRenderer, itemPropName } = this.props

    return (
      <StyledUList>
        {items.map((item, index) => (
          <StyledListItem key={item.id}>
            {itemRenderer(item, index, itemPropName)}
          </StyledListItem>
        ))}
      </StyledUList>
    )
  }
}
