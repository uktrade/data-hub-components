import React from 'react'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { FONT_SIZE, FONT_STACK } from '@govuk-react/constants'
import { createGlobalStyle } from "styled-components";

const req = require.context('../src', true, /.*\.stories\.(js|jsx)$/)

const GlobalStyle = createGlobalStyle`
  body {
    font: ${FONT_SIZE.SIZE_14} ${FONT_STACK};
  }
`

addDecorator(s => <><GlobalStyle />{s()}</>)
addDecorator(withInfo)

addParameters({
  options: {
    showAddonPanel: false,
  },
})

const loadStories = () => req.keys().forEach(filename => req(filename))

configure(loadStories, module)
