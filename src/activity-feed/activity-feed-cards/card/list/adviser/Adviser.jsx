import React from 'react'
import { Link } from 'govuk-react'
import PropTypes from 'prop-types'

import PROPS from './props'

const Adviser = ({ adviser }) => {
  const name = <span>{adviser.name}</span>
  const emailAddress = <Link href={`mailto:${adviser.emailAddress}`}> {adviser.emailAddress}</Link>
  const team = adviser.team ? `, (${adviser.team})` : null

  return <>{name}, {emailAddress}{team}</>
}

Adviser.propTypes = {
  adviser: PropTypes.shape(PROPS).isRequired,
}

export default Adviser
