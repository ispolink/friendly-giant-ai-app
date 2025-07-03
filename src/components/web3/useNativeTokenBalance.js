'use client'

import { formatUnits } from 'viem'
import { useAccount, useBalance } from 'wagmi'

export const useNativeTokenBalance = () => {
  const { address } = useAccount()
  const { data, isError, isLoading } = useBalance({ address })

  const balance = data?.value || 0n
  const decimals = data?.decimals || 18
  const symbol = data?.symbol || 'ETH'

  return {
    balance,
    balanceFormatted: formatUnits(balance, decimals),
    balanceFormattedNumber: Number(formatUnits(balance, decimals)),
    decimals,
    symbol,
    isLoading,
    isError,
  }
}

export default useNativeTokenBalance
