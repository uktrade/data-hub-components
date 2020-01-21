import React from 'react'
import PropTypes from 'prop-types'
import LoadingBox from '@govuk-react/loading-box'

import useFormContext from '../hooks/useFormContext'

function Form({
  initialValues,
  initialStep,
  onSubmit,
  scrollToTop,
  onExit,
  children,
}) {
  return (
    <useFormContext.Provider
      initialValues={initialValues}
      initialStep={initialStep}
      onSubmit={onSubmit}
      scrollToTop={scrollToTop}
      onExit={onExit}
    >
      <FormWrapper>{children}</FormWrapper>
    </useFormContext.Provider>
  )
}

Form.propTypes = {
  initialValues: PropTypes.shape({}),
  initialStep: PropTypes.number,
  onSubmit: PropTypes.func,
  scrollToTop: PropTypes.bool,
  onExit: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}

Form.defaultProps = {
  initialValues: {},
  initialStep: 0,
  onSubmit: null,
  scrollToTop: true,
  onExit: null,
  children: null,
}

function FormWrapper({ children }) {
  const formContextProps = useFormContext()

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
