import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'govuk-react'

const UList = styled('ul')`
  margin: 0;
  padding-left: 0
`

const ListItem = styled('li')`
  list-style-type: none;
`

const Person = ({ person }) => {
  const name = person.url ? <Link href={person.url}>{person.name}</Link> : person.name
  const emailAddress = <Link href={`mailto:${person.emailAddress}`}> {person.emailAddress}</Link>
  const jobTitle = person.jobTitle ? <span>({person.jobTitle})</span> : null
  const team = person.team ? <span>({person.team})</span> : null

  return <ListItem>{name} {emailAddress} {jobTitle} {team}</ListItem>
}

Person.propTypes = {
  person: PropTypes.object.isRequired,
}

const PeopleList = ({ people }) => {
  return <UList>{ people.map(person => <Person key={person.id} person={person} />) }</UList>
}

PeopleList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    emailAddress: PropTypes.string,
    jobTitle: PropTypes.string,
  })).isRequired,
}

export default PeopleList
