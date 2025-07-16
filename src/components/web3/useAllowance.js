import { useAccount, useReadContract, useChainId } from 'wagmi'
import { ERC20_ABI } from '@/abis'
import { getTokenContractAddress } from '@/config/chain'
import { useEffect, useRef, useState } from 'react'

export function useAllowance() {
  const { address: owner } = useAccount()
  const chainId = useChainId()
  const contractAddress = getTokenContractAddress(chainId)
  const [spender, setSpender] = useState()

  const result = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [owner, spender],
    query: {
      enabled: !!contractAddress && !!spender,
    },
  })

  const refetchPromiseRef = useRef()

  useEffect(() => {
    result
      .refetch()
      .then(res => {
        refetchPromiseRef.current?.resolve(res)
      })
      .catch(err => {
        refetchPromiseRef.current?.reject(err)
      })
      .finally(() => {
        refetchPromiseRef.current = null
      })
  }, [spender])

  return {
    ...result,
    refetch: _spender => {
      if (_spender == spender) {
        return result.refetch()
      } else {
        return new Promise((resolve, reject) => {
          refetchPromiseRef.current = { resolve, reject }
          setSpender(_spender)
        })
      }
    },
  }
}
