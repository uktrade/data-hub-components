import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'govuk-react'
import styled from 'styled-components'

const UList = styled('ul')`
  margin: 0;
  padding-left: 0
`

const ListItem = styled('li')`
  list-style-type: none;
`

// Advisers(s): John Smith, john.smith@dit.co.uk (Team)
const AdviserListItem = ({ adviser }) => {
  const name = <span>{adviser.name}</span>
  const emailAddress = <Link href={`mailto:${adviser.emailAddress}`}> {adviser.emailAddress}</Link>
  const team = adviser.team ? `(${adviser.team})` : null

  return <ListItem>{name}, {emailAddress}, {team}</ListItem>
}

export default class AdvisersList extends React.PureComponent {
  static propTypes = {
    advisers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      emailAddress: PropTypes.string.isRequired,
    })).isRequired,
  }

  render() {
    const { advisers } = this.props

    return (
      <UList>
        {
          advisers.map(adviser => <AdviserListItem key={adviser.id} adviser={adviser} />)
        }
      </UList>
    )
  }
}

AdviserListItem.propTypes = {
  adviser: PropTypes.object.isRequired,
}
