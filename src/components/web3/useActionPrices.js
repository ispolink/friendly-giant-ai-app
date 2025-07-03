import { useReadContract, useChainId } from 'wagmi'
import { XREQUEST_ABI } from '@/abis'
import { getXRequestContractAddress } from '@/config/chain'

export function useActionPrices() {
  const chainId = useChainId()
  const contractAddress = getXRequestContractAddress(chainId)

  const result = useReadContract({
    address: contractAddress,
    abi: XREQUEST_ABI,
    functionName: 'getActionPriceAll',
    query: {
      enabled: !!contractAddress,
    },
  })

  return result
}
