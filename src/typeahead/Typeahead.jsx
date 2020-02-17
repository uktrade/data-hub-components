import React from 'react'
import Select, { components as comps } from 'react-select'
import AsyncSelect from 'react-select/async'
import defaultStyles from './styles'
import Highlighter from './Highlighter'

const Option = ({ selectProps: { inputValue }, data: { label }, ...props }) => (
  <comps.Option {...props}>
    <Highlighter searchStr={inputValue} optionLabel={label} />
  </comps.Option>
)

Option.propTypes = comps.Option.propTypes

export const filterOption = ({ label = '' }, query) =>
  label.toLowerCase().includes(query)

const Typeahead = ({ options, styles, components, ...props }) => {
  const customisedProps = {
    styles: {
      ...defaultStyles,
      ...styles,
    },
    components: { Option },
    noOptionsMessage: () => 'No options found',
    filterOption,
    ...props,
  }

  return (
    <>
      {options ? (
        <Select {...customisedProps} options={options} />
      ) : (
        <AsyncSelect {...customisedProps} />
      )}
    </>
  )
}

Typeahead.propTypes = Select.propTypes

export default Typeahead
