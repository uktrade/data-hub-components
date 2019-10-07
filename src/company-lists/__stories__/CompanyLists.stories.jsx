import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CreateListForm from '../CreateListForm'
import AddRemoveFromListForm from '../AddRemoveFromListForm'
import listsWithCompany from '../__fixtures__/lists-with-company'

storiesOf('Company lists', module)
  .add('Create a new list', () => {
    return (
      <CreateListForm
        onSubmitHandler={action('I have been clicked!')}
        name="listName"
        hint="This is a name only you see, and can be up to 30 characters"
        label="List name"
        cancelUrl="/companies/"
        maxLength={30}
      />
    )
  })
  .add('Add or remove from list', () =>
    React.createElement(() => {
      const [loading, setLoading] = useState(false)
      const mockRequest = () => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }
      return (
        <>
          <h1>Add or remove Lambda plc from your lists</h1>
          <AddRemoveFromListForm
            list={listsWithCompany}
            onSubmitHandler={() => mockRequest()}
            isLoading={loading}
            createNewListUrl="#"
            cancelLinkUrl="#"
          />
        </>
      )
    })
  )
