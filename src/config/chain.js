const getInfuraUrlFor = network =>
  process.env.REACT_APP_INFURA_KEY?.toString() !== ''
    ? `https://${network}.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
    : undefined
const getAlchemyUrlFor = network =>
  process.env.REACT_APP_ALCHEMY_KEY?.toString() !== ''
    ? `https://${network}.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
    : undefined

const mainChains = []

export const testChains = [
  {
    chainId: 84532,
    chainIdHex: '0x14a54',
    name: 'Base Sepolia',
    networkUrl: 'https://sepolia.base.org',
    blockExplorerUrl: 'https://base-sepolia.blockscout.com/',
    logoUrl: 'https://base-sepolia.blockscout.com/assets/favicon/android-chrome-192x192.png',
    nativeCurrency: {
      name: 'Sepolia Ether',
      code: 'ETH',
    },
  },
]

export const chains = [...mainChains, ...testChains]

export const Chains = {}

export const TestChains = {
  BaseSepolia: {
    chainId: 84532,
    tokenContractAddress: '0xB46F91E0747BB858917ea399392F141750c03CBc',
    xRequestContractAddress: '0x31C485711dd0A860E4d00fccF6c3Cb3Ed8d99Ff8',
    urls: ['https://sepolia.base.org'],
  },
}

export const AllChains = { ...Chains, ...TestChains }

export const AllNetworks = {
  [TestChains.BaseSepolia.chainId]: TestChains.BaseSepolia,
}

/**
 * Retrieve Ispolink contract address based on the given chainId.
 *
 * @param chainId - decimal number
 * @returns {string}
 */
export function getTokenContractAddress(chainId) {
  const contractAddress = AllNetworks[chainId]?.tokenContractAddress
  return contractAddress
}

export function getXRequestContractAddress(chainId) {
  const contractAddress = AllNetworks[chainId]?.xRequestContractAddress
  return contractAddress
}

export function getBlockExplorerUrl(chainId, hash) {
  const chain = chains.find(c => c.chainId == chainId)
  return chain ? `${chain.blockExplorerUrl}/tx/${hash}` : ''
}
