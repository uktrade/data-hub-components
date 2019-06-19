import React from 'react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { H3, Link } from 'govuk-react'

const Heading = styled(H3)`
  font-weight: normal;
  color: #005ea5;
  margin-bottom: ${SPACING.SCALE_2};
  
  & > a:link, a:visited, a:hover, a:active {
    text-decoration: none;
  }
`

export default class CardHeading extends React.Component {
  render() {
    const { link } = this.props

    return (
      <Heading>
        <Link href={link.url}>{link.text}</Link>
      </Heading>
    )
  }
}
