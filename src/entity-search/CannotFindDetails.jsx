import { Details, Link, Paragraph } from 'govuk-react'
import React from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from 'lodash'

const CannotFindDetails = ({ summary, actions, link }) => {
  const onLinkClick = (e) => {
    e.preventDefault()
    link.onClick()
  }

  return (
    <Details summary={summary}>
      <div>
        <Paragraph>Try refining your search by taking the following actions:</Paragraph>
        <ul>
          {actions.map(text => <li key={uniqueId()}>{text}</li>)}
        </ul>
        <Link
          href={link.url ? link.url : '#cannot-find'}
          onClick={link.onClick ? onLinkClick : null}
        >
          {link.text}
        </Link>
      </div>
    </Details>
  )
}

CannotFindDetails.propTypes = {
  summary: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    onClick: PropTypes.func,
  }).isRequired,
}

export default CannotFindDetails
