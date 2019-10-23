import React from 'react'
import Button from '@govuk-react/button'
import Link from '@govuk-react/link'
import PropTypes from 'prop-types'
import Form from '../forms/elements/Form'
import FieldInput from '../forms/elements/FieldInput'
import FormActions from '../forms/elements/FormActions'

const CreateListForm = ({
  name,
  label,
  hint,
  maxLength,
  onSubmitHandler,
  cancelUrl,
}) => {
  const cancelLink = `${cancelUrl}`
  return (
    <Form onSubmit={onSubmitHandler}>
      <FieldInput
        name={name}
        type="text"
        label={label}
        required="Enter a name for your list"
        hint={hint}
        validate={(value) =>
          value && value.length > maxLength
            ? `Enter list name which is no longer than ${maxLength} characters`
            : null
        }
      />
      <FormActions>
        <Button>Create list</Button>
        <Link href={cancelLink}>Cancel</Link>
      </FormActions>
    </Form>
  )
}

CreateListForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  cancelUrl: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
}

CreateListForm.defaultProps = {
  hint: '',
}

export default CreateListForm
