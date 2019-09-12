import styled from 'styled-components'
import { Button } from 'govuk-react'
import { LINK_COLOUR } from 'govuk-colours'

const ButtonLink = styled(Button).attrs(props => (props))`
  &, &:hover, &:focus {
    background: transparent;
    box-shadow: none;
    color: ${LINK_COLOUR};
    cursor: pointer;
    text-decoration: underline;
    ${props => props.inline && `
      padding: 0;
      margin: 0;
    `}
  }
`

export default ButtonLink
