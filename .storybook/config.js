import { addDecorator, addParameters, configure } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

const req = require.context('../src', true, /.*\.stories\.(js|jsx)$/)

addDecorator(withInfo)

addParameters({
  options: {
    showAddonPanel: false,
  },
})

const loadStories = () => req.keys().forEach(filename => req(filename))

configure(loadStories, module)
