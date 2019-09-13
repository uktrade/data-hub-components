import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '@govuk-react/button'

import useFormContext from '../hooks/useFormContext'
import ButtonLink from '../../button-link/ButtonLink'

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

      {!hideForwardButton && <Button>{forwardButtonText || defaultForwardButtonText}</Button>}

      {' '}

      {!hideBackButton && !isFirstStep() && (
        <ButtonLink onClick={goBack}>
          {backButtonText || defaultBackButtonText}
        </ButtonLink>
      )}
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
