import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES, HEADING_SIZES, SPACING } from '@govuk-react/constants'
import { H3, Link } from 'govuk-react'
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
  color: #005ea5;
  
  & > a:link, a:visited, a:hover, a:active {
    text-decoration: none;
  }
  
  ${MEDIA_QUERIES.TABLET} {
    margin-bottom: ${SPACING.SCALE_5};
  }
`

export default class CardHeading extends React.PureComponent {
  static propTypes = {
    link: PropTypes.shape({
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    blockText: PropTypes.string,
  }

  static defaultProps = {
    blockText: null,
  }

  render() {
    const { link, blockText } = this.props
    const cardHeadingBlock = blockText ? <CardHeadingBlock text={blockText} /> : null
    return (
      <HeadingContainer>
        {cardHeadingBlock}
        <Heading>
          <Link href={link.url}>{link.text}</Link>
        </Heading>
      </HeadingContainer>
    )
  }
}
