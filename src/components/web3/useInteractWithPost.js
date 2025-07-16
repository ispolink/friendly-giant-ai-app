import { useState } from 'react'
import { useChainId, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { XREQUEST_ABI } from '@/abis'
import { getXRequestContractAddress } from '@/config/chain'

export function useInteractWithPost() {
  const chainId = useChainId()
  const contractAddress = getXRequestContractAddress(chainId)

  const [hash, setHash] = useState(undefined)
  const [tried, setTried] = useState(false)
  const { writeContractAsync, isError, isPending } = useWriteContract()
  const {
    isLoading,
    isSuccess: isWaitSuccess,
    isError: isWaitError,
    isPending: isWaitPending,
  } = useWaitForTransactionReceipt({
    hash,
    confirmations: 2,
    enabled: !!hash,
  })

  const interact = async (actionType, postUri) => {
    setTried(true)
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

  const reset = () => {
    setHash(undefined)
    setTried(false)
  }

  return {
    interact,
    reset,
    hash,
    isPending: (tried && isPending) || (!!hash && isWaitPending),
    isLoading: !!hash && isLoading,
    isSuccess: !!hash && isWaitSuccess,
    isError: (tried && isError) || (!!hash && isWaitError),
  }
}
