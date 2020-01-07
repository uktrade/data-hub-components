export default class NumberUtils {
  static decimal(number) {
    if (!number && number !== 0) {
      return null
    }

    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'decimal',
    })

    return formatter.format(number)
  }

  static currencyGBP(number) {
    if (!number && number !== 0) {
      return null
    }

    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumSignificantDigits: 21,
    })

    return formatter.format(number)
  }

  static currencyUSD(number) {
    if (!number && number !== 0) {
      return null
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 21,
    })

    return formatter.format(number)
  }
}
