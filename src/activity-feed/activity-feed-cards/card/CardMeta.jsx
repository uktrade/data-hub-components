import React from 'react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

import DateUtils from "../../../utils/DateUtils";

const CardMetaContainer = styled('div')`
  text-align: right;
`

const CardBadges = styled('div')`
  padding: ${SPACING.SCALE_2} 0 ${SPACING.SCALE_2};
`

const Badge = styled('span')`
  border: 2px solid #c0c0c0;
  border-radius: 4px;
  padding: 2px 4px;
`

export default class CardMeta extends React.Component {
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
