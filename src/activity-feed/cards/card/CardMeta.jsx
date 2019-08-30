import React from 'react'
import styled from 'styled-components'
import { SPACING, MEDIA_QUERIES, FONT_SIZE } from '@govuk-react/constants'
import { GREY_2 } from 'govuk-colours'
import PropTypes from 'prop-types'

import DateUtils from '../../../utils/DateUtils'

const CardMetaContainer = styled('div')`
  width: 100%;
  margin-bottom: ${SPACING.SCALE_1};
  font-size: ${FONT_SIZE.SIZE_16};
  
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
  border: ${({ borderColour }) => `2px solid ${borderColour || GREY_2}`};
  border-radius: 4px;
  padding: 2px 4px;
  font-size: ${FONT_SIZE.SIZE_14};
`

export default class CardMeta extends React.PureComponent {
  static propTypes = {
    startTime: PropTypes.string.isRequired,
    badge: PropTypes.shape({
      text: PropTypes.string,
      borderColour: PropTypes.string,
    }),
  }

  static defaultProps = {
    badge: null,
  }

  render() {
    const { startTime, badge } = this.props

    const cardBadge = badge ? (
      <CardBadges>
        <Badge borderColour={badge.borderColour}>
          {badge.text}
        </Badge>
      </CardBadges>
    ) : null

    return (
      <CardMetaContainer>
        {DateUtils.format(startTime)}
        {cardBadge}
      </CardMetaContainer>
    )
  }
}
