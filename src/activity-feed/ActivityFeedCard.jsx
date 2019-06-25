import React from 'react'
import { find } from 'lodash'

import PropTypes from 'prop-types'
import Cards from './activity-feed-cards'

export default class ActivityFeedCard extends React.PureComponent {
  static propTypes = {
    activity: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    const { activity } = this.props
    this.Card = find(Cards, c => c.canRender(activity))
  }

  render() {
    const { activity } = this.props
    const { Card } = this

    return Card ? <Card activity={activity} /> : null
  }
}
