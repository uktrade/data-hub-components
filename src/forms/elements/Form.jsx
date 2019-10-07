import React from 'react'
import PropTypes from 'prop-types'
import LoadingBox from '@govuk-react/loading-box'

import useFormContext from '../hooks/useFormContext'

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
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
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

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(formContextProps)
    }
    return children
  }

  return (
    <form
      noValidate={true}
      onSubmit={(e) => {
        e.preventDefault()
        formContextProps.goForward()
      }}
    >
      <LoadingBox loading={formContextProps.isLoading}>
        {renderChildren()}
      </LoadingBox>
    </form>
  )
}

FormWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}

FormWrapper.defaultProps = {
  children: null,
}

export default Form
