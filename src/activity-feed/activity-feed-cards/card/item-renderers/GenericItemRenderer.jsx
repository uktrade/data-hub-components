import PropTypes from 'prop-types'
import { isBoolean } from 'lodash'

// String, number and boolean
const GenericItemRenderer = (item, index, property) => {
  return isBoolean(item[property]) ? item[property].toString() : item[property]
}

GenericItemRenderer.propTypes = {
  item: PropTypes.shape.isRequired,
  index: PropTypes.number.isRequired,
  property: PropTypes.string.isRequired,
}

export default GenericItemRenderer
