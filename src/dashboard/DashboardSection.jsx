import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { typography } from '@govuk-react/lib'
import { SPACING } from '@govuk-react/constants'

import { GREY_2, GREY_1 } from 'govuk-colours'

const StyledHeading = styled.h2`
  font-size: 20px;
  font-weight: bold;
`

const StyledSubHeading = styled.p`
  color: ${GREY_1};
  margin-top: ${SPACING.SCALE_3};
  margin-bottom: ${SPACING.SCALE_3};
  width: 100%;
`

const StyledDashboardSectionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  ${typography.font({ size: 14 })}
`

const StyledHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${SPACING.SCALE_3};
`

function Heading({ children }) {
  return <StyledHeading>{children}</StyledHeading>
}

function SubHeading({ children }) {
  return <StyledSubHeading>{children}</StyledSubHeading>
}

const DashboardSection = ({
  children,
  heading,
  subHeading,
  showSubHeading,
  headingSlotComponent,
}) => {
  return (
    <StyledDashboardSectionContainer>
      <StyledHeadingContainer>
        <Heading>{heading}</Heading>
        {headingSlotComponent && <div>{headingSlotComponent}</div>}
      </StyledHeadingContainer>
      {showSubHeading && <SubHeading>{subHeading}</SubHeading>}
      {children}
    </StyledDashboardSectionContainer>
  )
}

DashboardSection.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  showSubHeading: PropTypes.bool,
  children: PropTypes.node,
  headingSlotComponent: PropTypes.node,
}

DashboardSection.defaultProps = {
  showSubHeading: false,
  subHeading: '',
  children: null,
  headingSlotComponent: null,
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
}

SubHeading.propTypes = {
  children: PropTypes.any.isRequired,
}

export default DashboardSection
