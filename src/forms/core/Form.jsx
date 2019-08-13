import React from 'react'
import PropTypes from 'prop-types'

import useFormContext from './useFormContext'

function Form(props) {
  const { initialValues, initialStep, onSubmit } = props

  return (
    <useFormContext.Provider
      initialValues={initialValues}
      initialStep={initialStep}
      onSubmit={onSubmit}
    >
      <FormWrapper {...props} />
    </useFormContext.Provider>
  )
}

Form.propTypes = {
  initialValues: PropTypes.shape({}),
  initialStep: PropTypes.number,
  onSubmit: PropTypes.func,
  children: PropTypes.any,
}

Form.defaultProps = {
  initialValues: {},
  initialStep: 0,
  onSubmit: null,
  children: null,
}

function FormWrapper(props) {
  const { children, ...rest } = props
  const formContextProps = useFormContext(rest)
  const { submitForm } = formContextProps

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(formContextProps)
    }
    return children
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submitForm()
      }}
    >
      {renderChildren()}
    </form>
  )
}

FormWrapper.propTypes = {
  children: PropTypes.any,
}

FormWrapper.defaultProps = {
  children: null,
}

export default Form
