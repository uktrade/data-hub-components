import React from 'react'
import { storiesOf } from '@storybook/react'

import StatusMessage from '../StatusMessage'
import { Error, Info, Success, Warning } from '../StatusMessageVariant'

storiesOf('StatusMessage', module)
  .add('Error', () => {
    return (
      <StatusMessage variant={Error}>An error message</StatusMessage>
    )
  })
  .add('Info', () => {
    return (
      <StatusMessage variant={Info}>An error message</StatusMessage>
    )
  })
  .add('Success', () => {
    return (
      <StatusMessage variant={Success}>A success message</StatusMessage>
    )
  })
  .add('Warning', () => {
    return (
      <StatusMessage variant={Warning}>A warning message</StatusMessage>
    )
  })
