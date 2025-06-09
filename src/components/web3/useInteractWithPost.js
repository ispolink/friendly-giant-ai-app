import { useState } from 'react'
import { useChainId, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { XREQUEST_ABI } from '@/abis'
import { getXRequestContractAddress } from '@/config/chain';

export function useInteractWithPost() {
  const chainId = useChainId()
  const contractAddress = getXRequestContractAddress(chainId)

  const [hash, setHash] = useState(undefined)
  const { writeContractAsync, isPending } = useWriteContract()
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
    enabled: !!hash,
  })

  const interact = async (actionType, postUri) => {
    try {
      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: XREQUEST_ABI,
        functionName: 'interactWithPost',
        args: [actionType, postUri],
      })
      setHash(txHash)
    } catch (error) {
      console.error('interactWithPost error:', error)
    }
  }

  const reset = () => setHash(undefined)

  return {
    interact,
    reset,
    hash,
    isPending,
    isLoading,
    isSuccess,
    isError,
  }
}
