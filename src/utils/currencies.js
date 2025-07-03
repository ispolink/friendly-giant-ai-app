/**
 * Taken from: https://docs.ethers.org/v6/migrating/#migrate-utils
 *
 * @param {string} value
 * @returns {string}
 */
export function commify(value) {
  const match = value.match(/^(-?)([0-9]*)(\.?)([0-9]*)$/)
  if (!match || (!match[2] && !match[4])) {
    throw new Error(`bad formatted number: ${JSON.stringify(value)}`)
  }

  const neg = match[1]
  const whole = BigInt(match[2] || 0).toLocaleString('en-us')
  const frac = match[4] ? match[4].match(/^(.*?)0*$/)[1] : '0'

  return `${neg}${whole}.${frac}`.replace(/\.$/, '').replace(/\.0$/, '')
}

/**
 * Format a cryptocurrency amount to a specified precision
 *
 * @param {BigInt} tokenAmount
 * @param {Boolean} compactNotation
 * @param {Number} precision
 * @param {string} locale
 * @returns {string}
 */
export function formatTokenAmount(
  tokenAmount,
  compactNotation = true,
  precision = 5,
  locale = 'en-US'
) {
  if (!tokenAmount) {
    return '0'
  }

  const weiDecimals = 18
  const divisor = BigInt(10 ** weiDecimals)
  const integerPart = tokenAmount / divisor
  const fractionPart = tokenAmount % divisor

  const fractionStr = ((fractionPart * BigInt(10 ** precision)) / divisor)
    .toString()
    .padStart(precision, '0')

  const number = Number(`${integerPart}.${fractionStr}`)

  return compactNotation
    ? new Intl.NumberFormat(locale, { notation: 'compact' }).format(number)
    : commify(number.toString())
}
