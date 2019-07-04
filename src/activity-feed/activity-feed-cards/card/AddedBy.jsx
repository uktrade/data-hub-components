import { Link } from 'govuk-react'
import React from 'react'
import PropTypes from 'prop-types'

const AddedBy = ({ adviser }) => {
  return (
    <div>
      <span>{adviser.name}</span>
      <Link href={`mailto:${adviser.emailAddress}`}> {adviser.emailAddress}</Link>
    </div>
  )
}

AddedBy.propTypes = {
  adviser: PropTypes.object.isRequired,
}

export default AddedBy
