/* eslint "react/destructuring-assignment": 0, react/prop-types: 0 */

import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import transformOptions from '../transformOptions'

import Typeahead from '../Typeahead'
import SmallTypeahead from '../SmallTypeahead'

const options = [
  { value: '1234', label: 'Chocolate', subLabel: 'mint' },
  { value: '5678', label: 'Strawberry', subLabel: 'Cream' },
  { value: '9876', label: 'Vanilla', subLabel: 'Vanilla' },
]

const asyncOptions = [
  {
    value: '379f390a-e083-4a2c-9cea-e3b9a08606a7',
    label: 'Holly Collins',
    subLabel: 'Heart of the South West LEP',
  },
  {
    value: '8dcd2bb8-dc73-4a42-8655-4ae42d4d3c5a',
    label: 'Bernard Harris-Patel',
    subLabel: 'Welsh Government (Investment)',
  },
  {
    value: 'a6f39399-5bf4-46cb-a686-826f73e9f0ca',
    label: 'Dennis Kennedy',
  },
]

storiesOf('Typeahead/Single select', module).add('Standard options', () =>
  React.createElement(() => {
    const [inputValue, setInputValue] = useState('')

    const onInputChange = (val) => {
      setInputValue(val)
    }
    return (
      <div style={{ maxWidth: '400px' }}>
        <Typeahead
          onInputChange={onInputChange}
          inputValue={inputValue}
          isMulti={false}
          closeMenuOnSelect={false}
          name="test_1"
          options={transformOptions(options)}
          placeholder="Search..."
        />
      </div>
    )
  })
)

storiesOf('Typeahead/Single select', module).add(
  'Options - pre-selected option',
  () => {
    return (
      <div style={{ maxWidth: '400px' }}>
        <Typeahead
          isMulti={false}
          closeMenuOnSelect={false}
          label="Options - pre-selected option"
          name="test_2"
          options={options}
          placeholder="Search..."
          value={options[2].value}
        />
      </div>
    )
  }
)

storiesOf('Typeahead/Single select', module).add('Small', () => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <SmallTypeahead
        isMulti={false}
        closeMenuOnSelect={false}
        name="test_2"
        options={transformOptions(options)}
        placeholder="Search..."
      />
    </div>
  )
})

storiesOf('Typeahead/Multiple select', module)
  .add('Standard options', () =>
    React.createElement(() => {
      const [inputValue, setInputValue] = useState('')

      const onInputChange = (val) => {
        setInputValue(val)
      }
      return (
        <div style={{ maxWidth: '400px' }}>
          <Typeahead
            onInputChange={onInputChange}
            inputValue={inputValue}
            isMulti={true}
            closeMenuOnSelect={false}
            label="Standard options"
            name="test_1"
            options={transformOptions(options)}
            placeholder="Search..."
          />
        </div>
      )
    })
  )

  .add('Options - pre-selected option', () =>
    React.createElement(() => {
      const [inputValue, setInputValue] = useState('')

      const onInputChange = (val) => {
        setInputValue(val)
      }
      return (
        <div style={{ maxWidth: '400px' }}>
          <Typeahead
            onInputChange={onInputChange}
            inputValue={inputValue}
            isMulti={true}
            closeMenuOnSelect={false}
            name="test_1"
            options={transformOptions(options)}
            placeholder="Search..."
            value={options[2].value}
          />
        </div>
      )
    })
  )

  .add('Async options', () =>
    React.createElement(() => {
      const [inputValue, setInputValue] = useState('')

      const getOptions = () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(transformOptions(asyncOptions)), 1000)
        })
      }

      const onInputChange = (val) => {
        setInputValue(val)
      }

      return (
        <div style={{ width: '600px' }}>
          <h2>Search for</h2>
          <ul>
            <li>Bernard</li>
            <li>Holly</li>
            <li>Dennis</li>
          </ul>
          <Typeahead
            onInputChange={onInputChange}
            inputValue={inputValue}
            isMulti={true}
            closeMenuOnSelect={false}
            name="test_4"
            loadOptions={getOptions}
            placeholder="Search advisers..."
            noOptionsMessage={() => <span>No advisers found</span>}
          />
        </div>
      )
    })
  )

  .add('Async options - pre-selected option', () =>
    React.createElement(() => {
      const [inputValue, setInputValue] = useState('')
      const getOptions = () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(transformOptions(asyncOptions)), 1000)
        })
      }

      const onInputChange = (val) => {
        setInputValue(val)
      }

      return (
        <div style={{ width: '600px' }}>
          <h2>Search for</h2>
          <ul>
            <li>Bernard</li>
            <li>Holly</li>
            <li>Dennis</li>
          </ul>
          <Typeahead
            onInputChange={onInputChange}
            inputValue={inputValue}
            isMulti={true}
            closeMenuOnSelect={false}
            name="test_4"
            loadOptions={getOptions}
            placeholder="Search advisers..."
            noOptionsMessage={() => <span>No advisers found</span>}
            value={asyncOptions[2]}
          />
        </div>
      )
    })
  )
