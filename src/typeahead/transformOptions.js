const transformOptions = (options) => {
  return options.map(({ value, label, subLabel }) => {
    return subLabel
      ? {
          value,
          label: `${label} - ${subLabel}`,
        }
      : {
          value,
          label,
        }
  })
}

export default transformOptions
