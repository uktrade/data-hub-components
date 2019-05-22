import React from 'react'
import { get, isEmpty } from 'lodash'
import { H3 } from 'govuk-react'
import styled from 'styled-components'

const Card = styled('div')`
  border: 1px solid #c0c0c0;
  padding: 15px;
`

const CardHeaderSubject = styled('div')`
  width: 100%;
  
  & > H3 {
    font-weight: normal;
    color: #005ea5;
  }
`

export default class Default extends React.Component {
  static canRender(activity) {
    return !isEmpty(activity)
  }

  render() {
    const { activity } = this.props
    const subject = get(activity, 'object.dit:subject')

    return (
      <Card>
        <CardHeaderSubject>
          <H3>{subject}</H3>
        </CardHeaderSubject>
      </Card>
    )
  }
}