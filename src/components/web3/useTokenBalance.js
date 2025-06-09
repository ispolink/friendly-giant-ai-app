'use client'

import { useAccount, useReadContract, useChainId  } from 'wagmi'
import { ERC20_ABI } from '@/abis';
import { getTokenContractAddress } from '@/config/chain';

export const useTokenBalance = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const tokenAddress = getTokenContractAddress(chainId)

  const { data: rawBalance, isLoading: isLoadingBalance, refetch } = useReadContract({
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
  return {
    balance: BigInt(rawBalance ?? 0),
    decimals,
    tokenAddress,
    chainId,
    isLoading: isLoadingBalance,
    refetch
  }
}

export default useTokenBalance
