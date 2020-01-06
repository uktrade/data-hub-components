import React from 'react'
import styled from 'styled-components'
import {
  MEDIA_QUERIES,
  HEADING_SIZES,
  SPACING,
  BODY_SIZES,
  SPACING_POINTS,
} from '@govuk-react/constants'
import { H3 } from '@govuk-react/heading'
import Link from '@govuk-react/link'
import { BLUE, GREY_1 } from 'govuk-colours'
import PropTypes from 'prop-types'

import CardHeadingBlock from './CardHeadingBlock'

const HeadingContainer = styled('div')`
  width: 100%;

  ${MEDIA_QUERIES.TABLET} {
    width: 0;
    flex-grow: 1;
  }
`

const Heading = styled(H3)`
  font-weight: normal;
  font-size: ${HEADING_SIZES.MEDIUM}px;
  color: ${BLUE};

  & > a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
  }

  ${MEDIA_QUERIES.TABLET} {
    margin-bottom: ${SPACING.SCALE_5};
  }
`

const StyledActivitySummary = styled(H3)`
  font-weight: normal;
  font-size: ${HEADING_SIZES.MEDIUM}px;
  color: #393939;

  ${MEDIA_QUERIES.TABLET} {
    margin-bottom: ${SPACING.SCALE_5};
  }
`

const StyledSubHeading = styled('span')`
  font-weight: normal;
  font-size: ${BODY_SIZES.MEDIUM}px;
  margin-left: ${SPACING_POINTS['1']}px;
  color: ${GREY_1};
`

export default class CardHeading extends React.PureComponent {
  static propTypes = {
    link: PropTypes.shape({
      url: PropTypes.string,
      text: PropTypes.string,
    }),
    blockText: PropTypes.string,
    subHeading: PropTypes.string,
    sourceType: PropTypes.string,
    summary: PropTypes.string,
  }

  static defaultProps = {
    blockText: null,
    link: null,
    subHeading: null,
    sourceType: null,
    summary: null,
  }

  renderActivitySummary = (summary) => {
    if (!summary) {
      return null
    }

    return <StyledActivitySummary>{summary}</StyledActivitySummary>
  }

  renderSubHeading = (data) => {
    if (!data) {
      return null
    }

    return <StyledSubHeading>{data}</StyledSubHeading>
  }

  renderLinkHeading = (link) => {
    if (!link) {
      return null
    }

    return (
      <Heading>
        <Link href={link.url}>{link.text}</Link>
      </Heading>
    )
  }

  render() {
    const { link, blockText, subHeading, sourceType, summary } = this.props
    const cardHeadingBlock = blockText ? (
      <CardHeadingBlock sourceType={sourceType} text={blockText} />
    ) : null

    return (
      <HeadingContainer>
        {cardHeadingBlock} {this.renderSubHeading(subHeading)}
        {this.renderActivitySummary(summary)}
        {this.renderLinkHeading(link)}
      </HeadingContainer>
    )
  }
}
