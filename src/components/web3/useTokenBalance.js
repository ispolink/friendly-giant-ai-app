'use client'

import { formatUnits } from 'viem'
import { useAccount, useReadContract, useChainId } from 'wagmi'
import { ERC20_ABI } from '@/abis'
import { getTokenContractAddress } from '@/config/chain'

export const useTokenBalance = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const tokenAddress = getTokenContractAddress(chainId)

  const {
    data: rawBalance,
    isLoading: isLoadingBalance,
    refetch,
  } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address && !!tokenAddress,
    },
  })

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: !!tokenAddress,
    },
  })

  const balance = rawBalance ?? 0n

  return {
    balance,
    balanceFormatted: formatUnits(balance, decimals),
    balanceFormattedNumber: Number(formatUnits(balance, decimals)),
    decimals,
    tokenAddress,
    chainId,
    isLoading: isLoadingBalance,
    refetch,
  }
}

export default useTokenBalance
