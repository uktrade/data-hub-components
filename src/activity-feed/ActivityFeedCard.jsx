import React from 'react'
import { find } from 'lodash'

import PropTypes from 'prop-types'
import Cards from './cards'

export default class ActivityFeedCard extends React.PureComponent {
  static propTypes = {
    activity: PropTypes.object.isRequired,
    showDetails: PropTypes.bool,
  }

  static defaultProps = {
    showDetails: false,
  }

  constructor(props) {
    super(props)
    const { activity } = this.props
    this.Card = find(Cards, c => c.canRender(activity))
  }

  render() {
    const { activity, showDetails } = this.props
    const { Card } = this

    return Card ? <Card activity={activity} showDetails={showDetails} /> : null
  }
}
