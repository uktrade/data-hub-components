import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CreateListForm } from '../../index'

const CreateListFormStory = () => {
  return (
    <CreateListForm
      onSubmitHandler={action('I have been clicked!')}
      id="1"
      name="listName"
      hint="This is a name only you see, and can be up to 30 characters"
      label="List name"
      cancelUrl="/companies/"
      maxLength={30}
    />
  )
}

storiesOf('Company lists', module)
  .add('Create a new list', () => <CreateListFormStory />)
