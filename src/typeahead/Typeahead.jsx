import React from 'react'
import PropTypes from 'prop-types'
import Select, { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import defaultStyles from './styles'
import Highlighter from './Highlighter'

const Option = ({ inputValue, ...props }) => {
  const {
    data: { label: optionLabel },
  } = props

  return (
    <components.Option {...props}>
      {inputValue ? (
        <Highlighter searchStr={inputValue} optionLabel={optionLabel} />
      ) : (
        optionLabel
      )}
    </components.Option>
  )
}

const Typeahead = ({ name, value, options, inputValue, styles, ...rest }) => {
  const commonProps = {
    styles: {
      ...defaultStyles,
      ...styles,
    },
    components: {
      Option: (props) => <Option {...props} inputValue={inputValue} />,
    },
  }

  const filterOptions = ({ label: labelToFilter }) =>
    labelToFilter ? labelToFilter.toLowerCase().includes(inputValue) : false

  return (
    <>
      {options ? (
        <Select
          {...commonProps}
          defaultValue={options.filter((option) => option.value === value)}
          options={options}
          {...rest}
        />
      ) : (
        <AsyncSelect
          {...commonProps}
          filterOption={filterOptions}
          defaultValue={value}
          {...rest}
        />
      )}
    </>
  )
}

Typeahead.propTypes = {
  name: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  value: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  options: PropTypes.array,
  styles: PropTypes.object,
}

Typeahead.defaultProps = {
  value: '',
  options: null,
  styles: {},
  noOptionsMessage: () => 'No options found',
}

Option.propTypes = {
  inputValue: PropTypes.string.isRequired,
  data: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
}

export default Typeahead
