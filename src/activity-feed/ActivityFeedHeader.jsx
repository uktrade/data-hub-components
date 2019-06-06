import React from 'react'
import PropTypes from 'prop-types'
import { H2, Button } from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

const HeaderSummary = styled.div`
  display: flex;
  border-bottom: 5px solid #000;
  margin-bottom: ${SPACING.SCALE_2};
  padding-bottom: ${SPACING.SCALE_2};
`

const HeaderCount = styled.div`
  flex-grow: 1;
  margin-top: ${SPACING.SCALE_1};
  & > H2 {
    font-weight: normal;
    font-size: 28px;
    margin-bottom: 0;
  }
`

const HeaderActions = styled.div`
  flex-grow: 1;
  text-align: right;
  & > Button {
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
  }

  render() {
    const { totalActivities, addContentText, addContentLink } = this.props
    const headerText = totalActivities > 0 ? `${totalActivities} activities` : 'Activities'
    const showAddContentButton = addContentText && addContentLink

    return (
      <React.Fragment>
        <HeaderSummary>
          <HeaderCount>
            <H2>{headerText}</H2>
          </HeaderCount>
          <HeaderActions>
            {showAddContentButton &&
              <Button
                as={Link}
                href={addContentLink}
                buttonColour="#dee0e2"
                buttonTextColour="#000">{addContentText}</Button>
            }
          </HeaderActions>
        </HeaderSummary>
      </React.Fragment>
    )
  }
}
