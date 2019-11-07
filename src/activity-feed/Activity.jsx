import React from 'react'
import { find } from 'lodash'

import PropTypes from 'prop-types'
import cards from './cards'

export default class Activity extends React.PureComponent {
  static propTypes = {
    activity: PropTypes.object.isRequired,
    showDetails: PropTypes.bool,
    filter: PropTypes.array,
  }

  static defaultProps = {
    showDetails: false,
    filter: [],
  }

  constructor(props) {
    super(props)
    const { activity, filter } = this.props

    this.Card = find(cards, (c) => c.canRender(activity, filter))
  }

  render() {
    const { activity, filter, showDetails } = this.props
    const { Card } = this

    return Card ? (
      <Card activity={activity} filter={filter} showDetails={showDetails} />
    ) : null
  }
}
