import { Details, Link, Paragraph } from 'govuk-react'
import React from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from 'lodash'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

const StyledDetails = styled(Details)`
  & > div {
    margin: ${SPACING.SCALE_1} 0 ${SPACING.SCALE_1} 4px;
  }
`

const StyledList = styled('ul')`
  list-style-type: disc;
  padding-left: ${SPACING.SCALE_5};
`

const CannotFindDetails = ({ summary, actions, link }) => {
  const onLinkClick = (e) => {
    e.preventDefault()
    link.onClick()
  }

  return (
    <StyledDetails summary={summary}>
      <div>
        <Paragraph>Try improving your search by:</Paragraph>
        <StyledList>
          {actions.map(text => <li key={uniqueId()}>{text}</li>)}
        </StyledList>
        <Link
          href={link.url ? link.url : '#cannot-find'}
          onClick={link.onClick ? onLinkClick : null}
        >
          {link.text}
        </Link>
      </div>
    </StyledDetails>
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
