import { useReadContract, useChainId } from 'wagmi'
import { ERC20_ABI } from '@/abis'
import { getTokenContractAddress } from '@/config/chain'

export function useSymbol() {
  const chainId = useChainId()
  const contractAddress = getTokenContractAddress(chainId)

  const result = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: {
      enabled: !!contractAddress,
    },
  })

  return result
}
