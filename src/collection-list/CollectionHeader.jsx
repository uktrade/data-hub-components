import React from 'react'
import PropTypes from 'prop-types'
import Button from '@govuk-react/button'
import styled from 'styled-components'
import pluralize from 'pluralize'
import { H2 } from '@govuk-react/heading'
import { BLACK, GREY_3 } from 'govuk-colours'
import { SPACING, MEDIA_QUERIES, FONT_SIZE } from '@govuk-react/constants'

const StyledSummary = styled('div')`
  display: flex;
  flex-flow: row wrap;
  border-bottom: ${SPACING.SCALE_1} solid ${BLACK};
  margin-bottom: ${SPACING.SCALE_2};
  padding-bottom: ${SPACING.SCALE_1};
`

const StyledCount = styled('div')`
  margin-top: ${SPACING.SCALE_1};
`

const StyledH2 = styled(H2)`
  font-weight: normal;
  font-size: ${FONT_SIZE.SIZE_27};
  margin-bottom: 0;
`

const StyledActions = styled('div')`
  text-align: right;
  width: 100%;
  margin: ${SPACING.SCALE_1} 0;

  ${MEDIA_QUERIES.TABLET} {
    width: 0;
    flex-grow: 1;
  }
`

const StyledLink = styled.a`
  margin-bottom: 0;
`

function CollectionHeader({ totalItems, itemName, addItemUrl }) {
  const headerText = pluralize(itemName, totalItems, true)

  return (
    <StyledSummary>
      <StyledCount>
        <StyledH2>{headerText}</StyledH2>
      </StyledCount>
      <StyledActions>
        {addItemUrl && (
          <Button
            as={StyledLink}
            href={addItemUrl}
            buttonColour={GREY_3}
            buttonTextColour={BLACK}
          >
            Add {itemName}
          </Button>
        )}
      </StyledActions>
    </StyledSummary>
  )
}

CollectionHeader.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  addItemUrl: PropTypes.string,
}

CollectionHeader.defaultProps = {
  addItemUrl: null,
}

export default CollectionHeader
