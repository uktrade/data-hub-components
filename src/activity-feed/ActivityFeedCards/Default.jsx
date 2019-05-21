import React from 'react'
import { get, isEmpty } from 'lodash'
import { H3 } from 'govuk-react'

export default class Default extends React.Component {
  static canRender(activity) {
    return !isEmpty(activity)
  }

  render() {
    const { activity } = this.props
    const subject = get(activity, 'object.dit:subject')

    return (
      <div style={{border: '1px solid #c0c0c0', padding: '10px'}}>
        <H3 style={{fontWeight: 'normal', color: '#005ea5'}}>{subject}</H3>
      </div>
    )
  }
}