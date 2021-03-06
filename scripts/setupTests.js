/* eslint-disable */

import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-styled-components'

configure({ adapter: new Adapter() })

// Required to fix issue with LoadingBox component from govuk-react.
// See: https://github.com/reactjs/react-transition-group/issues/436
const reactTransitionGroup = {
  ...jest.requireActual('react-transition-group'),
  CSSTransition: ({ children }) => <>{children}</>,
}
jest.setMock('react-transition-group', reactTransitionGroup)

// As jsdom does not support window.navigation, window.scrollTo or window.assign we need
// to remove any methods globally and spy on them using jest.fn().
delete window.scrollTo
delete window.location
window.scrollTo = jest.fn()
window.location = { assign: jest.fn() }

// Type checking with prop-types in Jest
// See: https://medium.com/shark-bytes/type-checking-with-prop-types-in-jest-e0cd0dc92d5

const originalConsoleError = console.error
console.error = (message, params) => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message)
  }

  originalConsoleError(message, params)
}
