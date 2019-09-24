import { useEffect } from 'react'
import { isEmpty } from 'lodash'

import useFormContext from './useFormContext'

function useField({ name, initialValue = '', validate = null, required = null }) {
  const {
    registerField,
    deregisterField,
    setFieldTouched,
    setFieldValue,
    getFieldState,
  } = useFormContext()

  function prepareValidators() {
    const validators = Array.isArray(validate) ? validate : [validate].filter(v => v)

    if (required) {
      validators.unshift(value => (isEmpty(value) ? required : null))
    }

    return validators
  }

  useEffect(
    () => {
      registerField({
        name,
        initialValue,
        validate: prepareValidators(),
      })

      return () => deregisterField(name)
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
