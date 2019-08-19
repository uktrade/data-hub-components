import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'govuk-react'
import { BLACK, GREY_2 } from 'govuk-colours'

import useFormContext from './useFormContext'

function Step({
  name, backButtonText, forwardButtonText,
  hideBackButton, hideForwardButton, children,
}) {
  const {
    currentStep,
    goBack,
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

  const defaultBackButtonText = 'Back'
  const defaultForwardButtonText = isLastStep() ? 'Submit' : 'Next'

  return (
    <>
      {children}

      {!hideBackButton && !isFirstStep() && (
        <Button
          buttonColour={GREY_2}
          buttonTextColour={BLACK}
          type="button"
          onClick={goBack}
        >
          {backButtonText || defaultBackButtonText}
        </Button>
      )}

      {' '}

      {!hideForwardButton && <Button>{forwardButtonText || defaultForwardButtonText}</Button>}
    </>
  )
}

Step.propTypes = {
  name: PropTypes.string,
  backButtonText: PropTypes.string,
  forwardButtonText: PropTypes.string,
  hideBackButton: PropTypes.bool,
  hideForwardButton: PropTypes.bool,
  children: PropTypes.node,
}

Step.defaultProps = {
  name: null,
  backButtonText: null,
  forwardButtonText: null,
  hideBackButton: false,
  hideForwardButton: false,
  children: null,
}

export default Step
