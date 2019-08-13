import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import useFormContext from './useFormContext'

function Step({ name, children }) {
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    registerStep,
    deregisterStep,
    getStepIndex,
    isFirstStep,
    isLastStep,
  } = useFormContext()

  useEffect(() => {
    registerStep(name)
    return () => deregisterStep(name)
  }, [name])

  const index = getStepIndex(name)

  if (index !== currentStep) {
    return null
  }

  return (
    <>
      {children}

      {!isFirstStep() && <button type="button" onClick={goToPreviousStep}>Back</button>}

      {isLastStep()
        ? <button type="submit">Submit</button>
        : <button type="button" onClick={goToNextStep}>Next</button>
      }
    </>
  )
}

Step.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
}

Step.defaultProps = {
  children: null,
}

export default Step
