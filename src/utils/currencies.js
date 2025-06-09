
/**
 * Format a cryptocurrency amount to a specified precision
 *
 * @param {BigInt} tokenAmount
 * @param {Boolean} compactNotation
 * @param {Number} precision
 * @returns {string}
 */
export function formatTokenAmount(tokenAmount, precision = 5, locale = 'en-US') {
  if (!tokenAmount) {
    return '0'
  }

  const weiDecimals = 18
  const divisor = BigInt(10 ** weiDecimals)
  const integerPart = tokenAmount / divisor
  const fractionPart = tokenAmount % divisor

  const fractionStr = (fractionPart * BigInt(10 ** precision) / divisor)
    .toString()
    .padStart(precision, '0')

  const number = Number(`${integerPart}.${fractionStr}`)

  return  new Intl.NumberFormat(locale, { notation: 'compact' }).format(Number(number))
}
