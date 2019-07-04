import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import shortid from 'shortid'
import { Link } from 'govuk-react'
import { compact } from 'lodash'

const UList = styled('ul')`
  margin: 0;
  padding-left: 0
`

const ListItem = styled('li')`
  list-style-type: none;
`

const PersonListItem = ({ person }) => {
  const name = person.type === 'Contact' ? <Link href={person.url}>{person.name}</Link> : <span>{person.name}</span>
  const jobTitle = person.jobTitle ? <span>({person.jobTitle})</span> : null

  const formattedListItem = []

  const listItem = compact([name, jobTitle])
  listItem.forEach((item, index) => {
    formattedListItem.push(item)
    if (index < listItem.length - 1) {
      formattedListItem.push(', ')
    }
  })

  return <ListItem>{ formattedListItem }</ListItem>
}

const PeopleList = ({ people }) => {
  if (!people) {
    return null
  }

  return (
    <UList>
      {
        people.map(person => <PersonListItem key={shortid.generate()} person={person} />)
      }
    </UList>
  )
}

PersonListItem.propTypes = {
  person: PropTypes.object.isRequired,
}

PeopleList.propTypes = {
  people: PropTypes.array.isRequired,
}

export default PeopleList
