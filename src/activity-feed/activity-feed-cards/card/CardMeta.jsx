import React from 'react'
import styled from 'styled-components'
import { SPACING, MEDIA_QUERIES } from '@govuk-react/constants'

import PropTypes from 'prop-types'
import DateUtils from '../../../utils/DateUtils'

const CardMetaContainer = styled('div')`
  width: 100%;
  margin-bottom: ${SPACING.SCALE_1};
  
  ${MEDIA_QUERIES.TABLET} {
    width: 200px;
    text-align: right;
  }
`

const CardBadges = styled('div')`
  padding: ${SPACING.SCALE_2} 0 ${SPACING.SCALE_2};
  display: inline;
  margin-left: 5px;
  
  ${MEDIA_QUERIES.TABLET} {
    display: block;
  }
`

const Badge = styled('span')`
  border: 2px solid #c0c0c0;
  border-radius: 4px;
  padding: 2px 4px;
`

export default class CardMeta extends React.Component {
  static propTypes = {
    startTime: PropTypes.string.isRequired,
    badge: PropTypes.string,
  }

  static defaultProps = {
    badge: null,
  }

  render() {
    const { startTime, badge } = this.props
    const cardBadge = badge ? <CardBadges><Badge>{badge}</Badge></CardBadges> : null

    return (
      <CardMetaContainer>
        {DateUtils.format(startTime)}
        {cardBadge}
      </CardMetaContainer>
    )
  }
}
