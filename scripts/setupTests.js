import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Required to fix issue with LoadingBox component from govuk-react.
// See: https://github.com/reactjs/react-transition-group/issues/436
const reactTransitionGroup = {
  ...jest.requireActual('react-transition-group'),
  CSSTransition: ({ children }) => <>{children}</>
}
jest.setMock('react-transition-group', reactTransitionGroup)
