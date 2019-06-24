import React from 'react'
import { Details, Link } from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import PropTypes from 'prop-types'

const GovUkDetails = styled(Details)`
  font-size: 100%;
  margin: ${SPACING.SCALE_3} 0 0;
  
  & > div {
    padding: ${SPACING.SCALE_1};
    padding-bottom: ${SPACING.SCALE_3};
    margin: ${SPACING.SCALE_1} 0 ${SPACING.SCALE_1} 4px;
    
    & > a {
      padding: ${SPACING.SCALE_4} 0 ${SPACING.SCALE_2} ${SPACING.SCALE_2};
    }
  }
`

export default class CardDetails extends React.Component {
  static propTypes = {
    summary: PropTypes.string.isRequired,
    link: PropTypes.shape({
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { summary, link, children } = this.props

    return (
      <GovUkDetails summary={summary}>
        {children}
        <Link href={link.url}>{link.text}</Link>
      </GovUkDetails>
    )
  }
}
