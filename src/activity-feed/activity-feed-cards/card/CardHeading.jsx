import React from 'react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { H3, Link } from 'govuk-react'
import PropTypes from 'prop-types'

const Heading = styled(H3)`
  font-weight: normal;
  color: #005ea5;
  margin-bottom: ${SPACING.SCALE_2};
  
  & > a:link, a:visited, a:hover, a:active {
    text-decoration: none;
  }
`

export default class CardHeading extends React.Component {
  static propTypes = {
    link: PropTypes.shape({
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { link } = this.props

    return (
      <Heading>
        <Link href={link.url}>{link.text}</Link>
      </Heading>
    )
  }
}
