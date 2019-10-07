import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import pluralise from 'pluralise'
import {
  SPACING,
  MEDIA_QUERIES,
  BORDER_WIDTH_FORM_ELEMENT,
} from '@govuk-react/constants'
import Button from '@govuk-react/button'
import Paragraph from '@govuk-react/paragraph'
import { BLACK } from 'govuk-colours'

const StyledWrapper = styled('div')`
  display: flex;
  flex-flow: row wrap;
  border-bottom: ${BORDER_WIDTH_FORM_ELEMENT} solid ${BLACK};
  margin-bottom: ${SPACING.SCALE_2};
  padding-bottom: ${SPACING.SCALE_1};
  align-items: center;
`

const StyledParagraph = styled(Paragraph)`
  width: 100%;
  margin-bottom: ${SPACING.SCALE_1};

  ${MEDIA_QUERIES.TABLET} {
    width: 0;
    flex-grow: 1;
  }
`

const StyledActions = styled('div')`
  text-align: right;
  width: 100%;
  margin-bottom: ${SPACING.SCALE_1};

  ${MEDIA_QUERIES.TABLET} {
    width: 0;
    flex-grow: 1;
  }
`

const StyledButton = styled(Button)`
  margin-bottom: 0;
`

function CollectionDownload({ totalItems, itemName, downloadUrl }) {
  const itemPlural = pluralise(2, `${itemName}`)
  const itemPluralWithCount = pluralise.withCount(totalItems, `% ${itemName}`)

  const SingularText = `You can download this ${itemName}`
  const PluralText = `You can download these ${itemPluralWithCount}`

  const NoItemsText = `There are no ${itemPlural} to download`
  const DownloadText = totalItems > 1 ? PluralText : SingularText
  const NeedToFilterText = `Filter to fewer than 5000 ${itemPlural} to download`

  if (totalItems === 0) {
    return (
      <StyledWrapper>
        <StyledParagraph>{NoItemsText}</StyledParagraph>
        <StyledActions />
      </StyledWrapper>
    )
  } else if (totalItems <= 5000) {
    return (
      <StyledWrapper>
        <StyledParagraph>{DownloadText}</StyledParagraph>
        <StyledActions>
          <StyledButton href={downloadUrl}>Download</StyledButton>
        </StyledActions>
      </StyledWrapper>
    )
  } else {
    return (
      <StyledWrapper>
        <StyledParagraph>{NeedToFilterText}</StyledParagraph>
      </StyledWrapper>
    )
  }
}

CollectionDownload.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  downloadUrl: PropTypes.string,
}

CollectionDownload.defaultProps = {
  downloadUrl: null,
}

export default CollectionDownload
