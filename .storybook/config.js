import {addDecorator, configure} from '@storybook/react'
import {withA11y} from '@storybook/addon-a11y'

const req = require.context('../src/components', true, /.*\.stories\.(js|jsx)$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(withA11y)

configure(loadStories, module)
