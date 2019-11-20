import React from 'react'
import Link from '@govuk-react/link'
import PropTypes from 'prop-types'

const NewWindowLink = ({ href, children, ...rest }) => (
  <>
    <Link
      href={href}
      target="_blank"
      aria-label="Opens in a new window"
      {...rest}
    >
      {children}
    </Link>{' '}
    (Opens in a new window)
  </>
)

NewWindowLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default NewWindowLink
