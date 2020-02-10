import transformOptions from '../transformOptions'

describe('transformOptions', () => {
  test('should return the label and sublabel', () => {
    const OPTIONS = [{ value: '1234', label: 'Chocolate', subLabel: 'mint' }]
    expect(transformOptions(OPTIONS)[0]).toEqual({
      label: 'Chocolate - mint',
      value: '1234',
    })
  })
  test('should return the label without sublabel', () => {
    const OPTIONS = [{ value: '1234', label: 'Chocolate' }]
    expect(transformOptions(OPTIONS)[0]).toEqual({
      label: 'Chocolate',
      value: '1234',
    })
  })
})
