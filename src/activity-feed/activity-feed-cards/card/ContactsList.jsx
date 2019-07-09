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

// Company contact(s): Joe Bloggs (Director)
const ContactsListItem = ({ contact }) => {
  const name = <Link href={contact.url}>{contact.name}</Link>
  const jobTitle = contact.jobTitle ? <span>({contact.jobTitle})</span> : null

  return <StyledListItem>{name} {jobTitle}</StyledListItem>
}

export default class ContactsList extends React.PureComponent {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string, // Can't set this as 'isRequired'
      name: PropTypes.string.isRequired,
      jobTitle: PropTypes.string,
    })).isRequired,
  }

  render() {
    const { contacts } = this.props

    return (
      <StyledUList>
        {
          contacts.map(contact => <ContactsListItem key={contact.id} contact={contact} />)
        }
      </StyledUList>
    )
  }
}

ContactsListItem.propTypes = {
  contact: PropTypes.object.isRequired,
}