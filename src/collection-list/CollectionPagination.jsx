import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SPACING, MEDIA_QUERIES, FONT_SIZE } from '@govuk-react/constants'
import { GREY_4, LINK_COLOUR, GREY_3, TEXT_COLOUR, GREY_1 } from 'govuk-colours'

const StyledNav = styled('nav')`
  text-align: center;
  line-height: 1;
  display: flex;
  justify-content: space-around;
  padding: ${SPACING.SCALE_3};

  ${MEDIA_QUERIES.TABLET} {
    display: block;
  }
`

const StyledAnchor = styled('a')`
  font-weight: bold;
  font-size: ${FONT_SIZE.SIZE_16};
  display: inline-block;
  padding: ${SPACING.SCALE_2} ${SPACING.SCALE_3};
  background-color: ${GREY_4};
  line-height: ${FONT_SIZE.SIZE_24};
  color: ${LINK_COLOUR};
  text-decoration: none;

    :hover {
      background-color: ${GREY_3};
    }
  }
`

const StyledCurrentAnchor = styled(StyledAnchor)`
  background-color: transparent;
  color: ${TEXT_COLOUR};
  text-decoration: none;
`

const StyledPrevious = styled(StyledAnchor)`
  margin-right: ${SPACING.SCALE_1};
`

const StyledNext = styled(StyledAnchor)`
  margin-left: ${SPACING.SCALE_1};
`

const StyledList = styled('ul')`
  display: none;

  ${MEDIA_QUERIES.TABLET} {
    display: inline-block;
    padding: 0;
  }
`

const StyledListItem = styled('li')`
  display: inline-block;

  & + & {
    margin-left: ${SPACING.SCALE_1};
  }
`

const StyledSpan = styled('span')`
  font-weight: bold;
  font-size: ${FONT_SIZE.SIZE_16};
  display: inline-block;
  padding: ${SPACING.SCALE_2};
  background-color: transparent;
  line-height: ${FONT_SIZE.SIZE_24};
  color: ${GREY_1};
`

function CollectionPagination({
  totalPages,
  currentPage,
  previous,
  next,
  pages,
}) {
  function getPages(page, current) {
    if (!page.url) {
      return <StyledSpan>{page.label}</StyledSpan>
    }
    if (page.label === JSON.stringify(current)) {
      return <StyledCurrentAnchor>{page.label}</StyledCurrentAnchor>
    }
    return <StyledAnchor href={page.url}>{page.label}</StyledAnchor>
  }

  return totalPages === 1 ? null : (
    <StyledNav aria-label={`pagination: total ${totalPages} pages`}>
      {previous && <StyledPrevious href={previous}>Previous</StyledPrevious>}
      <StyledList>
        {pages.map((page) => (
          <StyledListItem>{getPages(page, currentPage)}</StyledListItem>
        ))}
      </StyledList>
      {next && <StyledNext href={next}>Next</StyledNext>}
    </StyledNav>
  )
}

CollectionPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  previous: PropTypes.string,
  next: PropTypes.string,
  pages: PropTypes.array,
}

CollectionPagination.defaultProps = {
  previous: null,
  next: null,
  pages: null,
}

export default CollectionPagination
