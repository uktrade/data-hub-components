import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'govuk-react'

const StyledListItem = styled('li')`
  list-style-type: none;
`

const StyledUList = styled('ul')`
  margin: 0;
  padding-left: 0
`

export const CardAdviser = ({ adviser }) => {
  const name = <span>{adviser.name}</span>
  const emailAddress = <Link href={`mailto:${adviser.emailAddress}`}> {adviser.emailAddress}</Link>
  const team = adviser.team ? `, (${adviser.team})` : null

  return <>{name}, {emailAddress}{team}</>
}

CardAdviser.propTypes = {
  adviser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    team: PropTypes.string, // Only available for Interactions
  }).isRequired,
}

export const CardContact = ({ contact }) => {
  const name = <Link href={contact.url}>{contact.name}</Link>
  const jobTitle = contact.jobTitle ? <span>({contact.jobTitle})</span> : null

  return <>{name} {jobTitle}</>
}

CardContact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string, // Can't set this as 'isRequired'
    jobTitle: PropTypes.string,
  }).isRequired,
}

export default class CardDetailsList extends React.PureComponent {
  static propTypes = {
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { people } = this.props

    return (
      <StyledUList>
        {
          people.map(person => (
            <StyledListItem key={person.id}>
              {
                person.type === 'Adviser' ? <CardAdviser adviser={person} /> : <CardContact contact={person} />
              }
            </StyledListItem>
          ))
        }
      </StyledUList>
    )
  }
}
