import React from 'react'
import {Details, Link} from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

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
  render() {
    const { summary, children, link } = this.props

    return (
      <GovUkDetails summary={summary}>
        {children}
        <Link href={link.url}>{link.text}</Link>
      </GovUkDetails>
    )
  }
}
