import React from 'react'
import PropTypes from 'prop-types'
import { H2, Button } from 'govuk-react'
import styled from 'styled-components'

const HeaderSummary = styled.div`
  display: flex;
  border-bottom: 2px solid #000;
  margin-bottom: 10px;
  padding-bottom: 10px;
`

const HeaderCount = styled.div`
  flex-grow: 1;
  margin-top: 4px;
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
    totalCards: PropTypes.number.isRequired,
    addContentText: PropTypes.string,
    addContentLink: PropTypes.string,
  }

  render() {
    const { totalCards, addContentText, addContentLink } = this.props
    const headerText = totalCards > 0 ? `${totalCards} activities` : 'Activities'
    const showAddContentButton = addContentText && addContentLink

    return (
      <React.Fragment>
        <HeaderSummary>
          <HeaderCount>
            <H2>{headerText}</H2>
          </HeaderCount>
          <HeaderActions>
            {showAddContentButton &&
              <Button as={Link} href={addContentLink} buttonColour="#dee0e2" buttonTextColour="#000">{addContentText}</Button>
            }
          </HeaderActions>
        </HeaderSummary>
      </React.Fragment>
    )
  }
}
