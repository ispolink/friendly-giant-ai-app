import { BigNumber } from '@ethersproject/bignumber'
import { commify, formatEther } from '@ethersproject/units'

/**
 * Format a cryptocurrency amount to a specified precision
 *
 * @param {BigNumber} tokenAmount
 * @param {Boolean} compactNotation
 * @param {Number} precision
 * @returns {string}
 */
export function formatTokenAmount(tokenAmount, compactNotation = false, precision = 5) {
  if (!tokenAmount || !(tokenAmount.mod)) {
    return '0'
  }

  const weiDecimals = 18
  const precisionWei = weiDecimals - precision
  const decimalPlacesWei = BigNumber.from(10).pow(precisionWei)
  const remainder = tokenAmount.mod(decimalPlacesWei)
  const roundedAmount = tokenAmount.sub(remainder)

  const result = formatEther(roundedAmount)
  return compactNotation
    ? new Intl.NumberFormat('en-US', { notation: 'compact' }).format(Number(result))
    : commify(result).replace(/\.0+$/g, '')
}
