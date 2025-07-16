import { useState } from 'react'
import { useChainId, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ERC20_ABI } from '@/abis'
import { getTokenContractAddress } from '@/config/chain'

export function useApprove() {
  const chainId = useChainId()
  const contractAddress = getTokenContractAddress(chainId)

  const [hash, setHash] = useState(undefined)
  const [tried, setTried] = useState(false)
  const { writeContractAsync, isError, isPending, ...result } = useWriteContract()
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

  const approve = async (spender, amount) => {
    return new Promise(async (resolve, reject) => {
      const onSuccess = () => {
        setTimeout(() => resolve())
      }
      const onError = () => {
        setTimeout(() => reject())
      }
      try {
        setTried(true)
        const txHash = await writeContractAsync(
          {
            address: contractAddress,
            abi: ERC20_ABI,
            functionName: 'approve',
            args: [spender, amount],
          },
          { onSuccess, onError }
        )
        setHash(txHash)
      } catch (error) {
        console.error('interactWithPost error:', error)
      }
    })
  }

  const reset = () => {
    setHash(undefined)
    setTried(false)
  }

  return {
    ...result,
    approve,
    reset,
    tried,
    hash,
    isPending: (tried && isPending) || (!!hash && isWaitPending),
    isLoading: !!hash && isLoading,
    isSuccess: !!hash && isWaitSuccess,
    isError: (tried && isError) || (!!hash && isWaitError),
  }
}
