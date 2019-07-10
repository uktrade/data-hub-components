import PropTypes from 'prop-types'

const PROPS = {
  name: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired,
  team: PropTypes.string, // Only available for Interactions
}

export default PROPS
