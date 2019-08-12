import React from 'react'
import styled from 'styled-components'
import { uniqueId } from 'lodash'

const StyledListItem = styled('li')`
  list-style-type: none;
`

const StyledUList = styled('ul')`
  margin: 0;
  padding-left: 0
`

export default class CardDetailsList extends React.PureComponent {
  static defaultProps = {
    people: null,
  }

  renderPeopleList = (people) => {
    if (!people) {
      return null
    }
    return (
      <StyledUList>
        {
          items.map((item, index) => (
            <StyledListItem key={item.id}>
              {
                itemRenderer(item, index)
              }
            </StyledListItem>
          ))
        }
      </StyledUList>
    )
  }

  renderGenericList = (list) => {
    return (
      <StyledUList>
        {
          list.map((item, index) => (
            <StyledListItem key={uniqueId(`key-${index}`)}>
              {item}
            </StyledListItem>
          ))
        }
      </StyledUList>
    )
  }

  renderList = ({ people, list }) => {
    if (people) {
      return this.renderPeopleList(people)
    } else {
      return this.renderGenericList(list)
    }
  }

  render() {
    return (
      <>
        {this.renderList(this.props)}
      </>
    )
  }
}
