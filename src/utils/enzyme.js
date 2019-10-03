export const withTargetValue = value => ({
  target: {
    value,
  },
})

/**
 * @function getOptionValueByText
 * @description Finds an `<option>` element with its inner text matching the
 * {text} parameter and returns the value of its `value` attribute.
 * @param {*} wrapper - Enzyme React wrapper
 * @param {String} text - The option text
 */
export const getOptionValueByText = (wrapper, text) => (
  wrapper.find('option')
    .find({ children: text })
    .props()
    .value
)

/**
 * @function changeAndUpdate
 * @description Simulates the `change` event on the provided {wrapper} with
 * {vaule} as `target.value` and updates (re-renders) the wrapper.
 * @param {*} wrapper - Enzyme React wrapper
 * @param {*} value - The value to be used as `event.target`
 */
export const changeAndUpdate = (wrapper, value) => {
  wrapper.simulate('change', withTargetValue(value))
  wrapper.update()
}

/**
 * @function changeSelectAndUpdate
 * @description Finds a `<select>` element in the wrapper, selects the option
 * matching the {text} and updates (re-renders) the wrapper.
 * @param {*} wrapper - Enzyme React wrapper
 * @param {String} text - The option text
 */
export const changeSelectAndUpdate = (wrapper, text) => {
  changeAndUpdate(wrapper.find('select'), getOptionValueByText(wrapper, text))
  wrapper.update()
}
