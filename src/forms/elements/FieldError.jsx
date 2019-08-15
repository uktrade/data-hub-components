import React from 'react'
import PropTypes from 'prop-types'

import useFormContext from '../core/useFormContext'

const FieldError = ({ name }) => {
  const { getFieldState } = useFormContext()
  const { error } = getFieldState(name)

  return (
    error ? <small style={{ color: 'red' }}>{error}</small> : null
  )
}

FieldError.propTypes = {
  name: PropTypes.string.isRequired,
}

export default FieldError
