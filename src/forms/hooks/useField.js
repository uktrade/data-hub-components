import { useEffect } from 'react'

import useFormContext from './useFormContext'

function useField({ name, label, initialValue = '', validate = null }) {
  const {
    registerField,
    deregisterField,
    setFieldTouched,
    setFieldValue,
    getFieldState,
  } = useFormContext()

  useEffect(
    () => {
      registerField({ name, label, initialValue, validate })

      return () => {
        deregisterField(name)
      }
    },
    [name],
  )

  const fieldState = getFieldState(name)

  return {
    name,
    value: fieldState.value,
    error: fieldState.error,
    touched: fieldState.touched,
    onChange: e => setFieldValue(name, e.target.value),
    onBlur: () => setFieldTouched(name, true),
  }
}

export default useField
