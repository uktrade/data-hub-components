import React from 'react'
import PropTypes from 'prop-types'
import Button from '@govuk-react/button'
import { H2 } from '@govuk-react/heading'
import styled from 'styled-components'
import { SPACING, MEDIA_QUERIES } from '@govuk-react/constants'
import pluralize from 'pluralize'

const HeaderSummary = styled('div')`
  display: flex;
  flex-flow: row wrap;
  border-bottom: 2px solid #000;
  margin-bottom: ${SPACING.SCALE_2};
  padding-bottom: ${SPACING.SCALE_1};

  & > div {
    width: 100%;
    margin-bottom: ${SPACING.SCALE_1};

    ${MEDIA_QUERIES.TABLET} {
      width: 0;
      flex-grow: 1;
    }
  }
`

const HeaderCount = styled('div')`
  margin-top: ${SPACING.SCALE_1};

  & > h2 {
    font-weight: normal;
    font-size: 28px;
    margin-bottom: 0;
  }
`

const HeaderActions = styled('div')`
  text-align: right;

  & > button {
    margin-bottom: 0;
  }
`

const Link = styled.a`
  margin-bottom: 0;
`

export default class ActivityFeedHeader extends React.Component {
  static propTypes = {
    totalActivities: PropTypes.number,
    addContentText: PropTypes.string,
    addContentLink: PropTypes.string,
  }

  static defaultProps = {
    totalActivities: 0,
    addContentText: null,
    addContentLink: null,
  }

  render() {
    const { totalActivities, addContentText, addContentLink } = this.props
    const headerText = totalActivities
      ? pluralize('activity', totalActivities, true)
      : 'Activities'

    const showAddContentButton = addContentText && addContentLink

    return (
      <HeaderSummary>
        <HeaderCount>
          <H2>{headerText}</H2>
        </HeaderCount>
        <HeaderActions>
          {showAddContentButton && (
            <Button
              as={Link}
              href={addContentLink}
              buttonColour="#dee0e2"
              buttonTextColour="#000"
            >
              {addContentText}
            </Button>
          )}
        </HeaderActions>
      </HeaderSummary>
    )
  }
}
