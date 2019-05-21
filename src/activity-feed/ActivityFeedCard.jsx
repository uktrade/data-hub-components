import React from 'react'
import { find } from 'lodash'

import Cards from './ActivityFeedCards'

export default class ActivityFeedCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Card: null,
    }
  }

  componentDidMount() {
    const { activity } = this.props

    const Card = find(Cards, (Card) => {
      return Card.canRender(activity)
    })

    this.setState({ Card })
  }

  render() {
    const { activity } = this.props
    const { Card } = this.state

    return Card ? <Card activity={activity} /> : null
  }
}
