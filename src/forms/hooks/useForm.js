import { useState } from 'react'
import { isEmpty, isEqual, set, get } from 'lodash'
import { useBeforeUnload } from 'react-use'

function useForm({
  initialValues = {},
  initialStep = 0,
  onSubmit = null,
} = {}) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [fields, setFields] = useState({})
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isDirty = !isEmpty(values) && !isEqual(values, initialValues)

  const formState = {
    values,
    touched,
    errors,
    fields,
    steps,
    currentStep,
    isSubmitted,
    isDirty,
  }

  useBeforeUnload(
    isDirty && !isSubmitted,
    'Changes that you made will not be saved.',
  )

  const getFieldState = fieldName => ({
    value: get(values, fieldName, ''),
    touched: touched[fieldName] || false,
    error: errors[fieldName] || null,
  })

  const validateField = (fieldName) => {
    const field = fields[fieldName]
    const value = get(values, fieldName)

    if (!field) {
      throw new Error(`Field ${fieldName} does not exist`)
    }

    if (field && 'validate' in field) {
      if (typeof field.validate === 'function') {
        return field.validate(value, fieldName, formState)
      }

      if (Array.isArray(field.validate)) {
        const validationErrors = field.validate
          .map(validator => validator(value, field, formState))
          .filter(e => e)
        return validationErrors.length > 0 ? validationErrors[0] : null
      }
    }

    return null
  }

  const validateForm = (fieldNames = []) => {
    const fieldsToValidate = fieldNames.length > 0 ? fieldNames : Object.keys(fields)
    const newErrors = {}
    const newTouched = {}

    fieldsToValidate.forEach((fieldName) => {
      const error = validateField(fieldName)
      if (error) {
        newErrors[fieldName] = error
      }
      newTouched[fieldName] = true
    })

    setErrors(newErrors)
    setTouched(newTouched)

    return newErrors
  }

  const setFieldValue = (fieldName, fieldValue) => {
    if (fieldValue === '') {
      return
    }

    setValues(prevValues => set({ ...prevValues }, fieldName, fieldValue))
  }

  const setFieldTouched = (fieldName, fieldTouched) => {
    setTouched(prevTouched => ({ ...prevTouched, [fieldName]: fieldTouched }))
  }

  const setFieldError = (fieldName, error) => {
    setErrors(prevErrors => ({ ...prevErrors, [fieldName]: error }))
  }

  const registerField = (field) => {
    setFields((prevFields) => {
      const { name: fieldName, initialValue } = field

      if (initialValue) {
        setFieldValue(fieldName, initialValue)
      }

      setFieldTouched(fieldName, false)

      if (!(fieldName in prevFields)) {
        return {
          ...prevFields,
          [fieldName]: field,
        }
      }
      return prevFields
    })
  }

  const deregisterField = (fieldName) => {
    setFields((prevFields) => {
      const newFields = { ...prevFields }
      delete newFields[fieldName]
      return newFields
    })
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      delete newErrors[fieldName]
      return newErrors
    })
    setTouched((prevTouched) => {
      const newTouched = { ...prevTouched }
      delete newTouched[fieldName]
      return newTouched
    })
  }

  const registerStep = (fieldName) => {
    setSteps((prevSteps) => {
      if (!prevSteps.includes(fieldName)) {
        const newSteps = [...prevSteps]
        newSteps.push(fieldName)
        return newSteps
      }
      return prevSteps
    })
  }
  const deregisterStep = fieldName => setSteps(prevSteps => prevSteps.filter(s => s !== fieldName))

  const isFirstStep = () => currentStep === 0
  const isLastStep = () => currentStep === steps.length - 1 || steps.length === 0

  const getStepIndex = (stepName) => {
    const index = steps.indexOf(stepName)
    return index !== -1 ? index : null
  }

  const goForward = () => {
    const validationErrors = validateForm()

    if (!isEmpty(validationErrors)) {
      return
    }

    if (!isLastStep()) {
      setCurrentStep(currentStep + 1)
      return
    }

    if (typeof onSubmit === 'function') {
      onSubmit(values)
    }

    setIsSubmitted(true)
  }
  const goBack = () => setCurrentStep(currentStep - 1)
  const goToStepByName = stepName => setCurrentStep(steps.indexOf(stepName))

  return {
    ...formState,
    registerField,
    deregisterField,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    getFieldState,
    validateForm,
    validateField,
    registerStep,
    deregisterStep,
    setCurrentStep,
    setIsSubmitted,
    goForward,
    goBack,
    goToStepByName,
    getStepIndex,
    isLastStep,
    isFirstStep,
  }
}

export default useForm
