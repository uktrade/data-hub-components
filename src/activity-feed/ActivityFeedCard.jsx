import React from 'react'
import { find } from 'lodash'

import PropTypes from 'prop-types'
import Cards from './activity-feed-cards'

export default class ActivityFeedCard extends React.Component {
  static propTypes = {
    activity: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      Card: null,
    }
  }

  componentDidMount() {
    const { activity } = this.props

    const Card = find(Cards, c => c.canRender(activity))

    this.setState({ Card })
  }

  render() {
    const { activity } = this.props
    const { Card } = this.state

    return Card ? <Card activity={activity} /> : null
  }
}
