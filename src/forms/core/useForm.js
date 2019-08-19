import { useState } from 'react'
import { isEmpty } from 'lodash'

function useForm({ initialValues = {}, initialStep = 0, onSubmit = null } = {}) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [fields, setFields] = useState({})
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(initialStep)

  const getFieldState = name => ({
    value: values[name] || '',
    touched: touched[name],
    error: errors[name],
  })

  const validateField = (name) => {
    const field = fields[name]
    const value = values[name]

    if (!field) {
      return 'Field does not exists'
    }

    if (field && 'validate' in field && typeof field.validate === 'function') {
      return field.validate(value, name)
    }

    return null
  }

  const validateForm = (fieldNames = []) => {
    const fieldsToValidate = fieldNames.length > 0 ? fieldNames : Object.keys(fields)
    const newErrors = {}
    const newTouched = {}

    fieldsToValidate.forEach((name) => {
      const error = validateField(name)
      if (error) {
        newErrors[name] = error
      }
      newTouched[name] = true
    })

    setErrors(newErrors)
    setTouched(newTouched)

    return newErrors
  }

  const setFieldValue = (name, fieldValue) => setValues((prevValues) => {
    return { ...prevValues, [name]: fieldValue }
  })
  const setFieldTouched = (name, fieldTouched, performValidation = true) => {
    setTouched(prevTouched => ({ ...prevTouched, [name]: fieldTouched }))

    if (performValidation) {
      const error = validateField(name)
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          [name]: error,
        }
      })
    }
  }
  const setFieldError = (name, error) => setErrors(prevErrors => ({ ...prevErrors, [name]: error }))

  const registerField = field => setFields((prevFields) => {
    const { name, initialValue } = field

    if (initialValue) {
      setFieldValue(name, initialValue)
    }

    setFieldTouched(name, false, false)

    if (!(name in prevFields)) {
      return {
        ...prevFields,
        [name]: field,
      }
    }
    return prevFields
  })

  const deregisterField = (name) => {
    setFields((prevFields) => {
      const newFields = { ...prevFields }
      delete newFields[name]
      return newFields
    })
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      delete newErrors[name]
      return newErrors
    })
    setTouched((prevTouched) => {
      const newTouched = { ...prevTouched }
      delete newTouched[name]
      return newTouched
    })
  }

  const registerStep = (name) => {
    setSteps((prevSteps) => {
      if (!prevSteps.includes(name)) {
        const newSteps = [...prevSteps]
        newSteps.push(name)
        return newSteps
      }
      return prevSteps
    })
  }
  const deregisterStep = name => setSteps(prevSteps => prevSteps.filter(s => s !== name))

  const goToNextStep = () => {
    const validationErrors = validateForm()
    if (isEmpty(validationErrors)) {
      setCurrentStep(currentStep + 1)
    }
  }
  const goToPreviousStep = () => setCurrentStep(currentStep - 1)
  const goToStepByName = stepName => setCurrentStep(steps.indexOf(stepName))
  const submitForm = () => {
    const validationErrors = validateForm()
    if (isEmpty(validationErrors)) {
      onSubmit(values)
    }
  }

  const isFirstStep = () => currentStep === 0
  const isLastStep = () => currentStep === steps.length - 1 || steps.length === 0

  const getStepIndex = (stepName) => {
    const index = steps.indexOf(stepName)
    return index !== -1 ? index : null
  }

  return {
    fields,
    values,
    touched,
    errors,
    registerField,
    deregisterField,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    getFieldState,
    validateForm,
    validateField,
    currentStep,
    steps,
    registerStep,
    deregisterStep,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep,
    goToStepByName,
    getStepIndex,
    isLastStep,
    isFirstStep,
    submitForm,
  }
}

export default useForm