import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'govuk-react'
import styled from 'styled-components'

const StyledUList = styled('ul')`
  margin: 0;
  padding-left: 0
`

const StyledListItem = styled('li')`
  list-style-type: none;
`

// Advisers(s): John Smith, john.smith@dit.co.uk (Team)
const AdviserListItem = ({ adviser }) => {
  const name = <span>{adviser.name}</span>
  const emailAddress = <Link href={`mailto:${adviser.emailAddress}`}> {adviser.emailAddress}</Link>
  const team = adviser.team ? `, (${adviser.team})` : null

  return <StyledListItem>{name}, {emailAddress}{team}</StyledListItem>
}

export default class AdvisersList extends React.PureComponent {
  static propTypes = {
    advisers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      emailAddress: PropTypes.string.isRequired,
      team: PropTypes.string,
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

AdviserListItem.propTypes = {
  adviser: PropTypes.object.isRequired,
}
