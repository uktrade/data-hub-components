export default class NumberUtils {
  static decimal (number) {
    if(!number) {
      return null
    }

    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'decimal',
    });

    return formatter.format(number)
  }
}
