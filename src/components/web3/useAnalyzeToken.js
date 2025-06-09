import { useState } from 'react'
import { useChainId, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { XREQUEST_ABI } from '@/abis'
import { getXRequestContractAddress } from '@/config/chain';

export function useAnalyzeToken() {
  const chainId = useChainId()
  const contractAddress = getXRequestContractAddress(chainId)

  const [hash, setHash] = useState(undefined)
  const { writeContractAsync, isPending } = useWriteContract()
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
    enabled: !!hash,
  })

  const analyze = async (tokenTicker) => {
    try {
      setHash(undefined)
      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: XREQUEST_ABI,
        functionName: 'analyzeToken',
        args: [tokenTicker],
      })
      setHash(txHash)
    } catch (error) {
      console.error('analyzeToken error:', error)
    }
  }

  const reset = () => setHash(undefined)

  return {
    analyze,
    reset,
    hash,
    isPending,
    isLoading,
    isSuccess,
    isError,
  }
}
