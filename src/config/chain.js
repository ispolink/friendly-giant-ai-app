const getInfuraUrlFor = network =>
  process.env.REACT_APP_INFURA_KEY?.toString() !== ''
    ? `https://${network}.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
    : undefined
const getAlchemyUrlFor = network =>
  process.env.REACT_APP_ALCHEMY_KEY?.toString() !== ''
    ? `https://${network}.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
    : undefined
    
export const chains = [
  {
    "chainId": 1,
    "chainIdHex": "0x1",
    "name": "Ethereum",
    "networkType": 1,
    "networkUrl": "https://mainnet.infura.io/v3/",
    "blockExplorerUrl": "https://etherscan.io/",
    "logoUrl": "https://raw.githubusercontent.com/mikyjo/crypto_assets/main/blockchains/ethereum/eth_logo_128.png",
    "nativeCurrencyId": 1,
    "nativeCurrency": {
      "id": 1,
      "name": "Ethereum",
      "code": "ETH"
    }
  },
  {
    "chainId": 56,
    "chainIdHex": "0x38",
    "name": "BNB Chain",
    "networkType": 1,
    "networkUrl": "https://bsc-dataseed1.ninicoin.io",
    "blockExplorerUrl": "https://bscscan.com/",
    "logoUrl": "https://raw.githubusercontent.com/mikyjo/crypto_assets/main/blockchains/binance_smart_chain/bsc_logo_128.png",
    "nativeCurrencyId": 3,
    "nativeCurrency": {
      "id": 3,
      "name": "Binance Coin",
      "code": "BNB"
    }
  },
  {
    "chainId": 137,
    "chainIdHex": "0x89",
    "name": "Polygon",
    "networkType": 1,
    "networkUrl": "https://rpc-mainnet.maticvigil.com/",
    "blockExplorerUrl": "https://polygonscan.com/",
    "logoUrl": "https://raw.githubusercontent.com/mikyjo/crypto_assets/main/blockchains/polygon/polygon_logo_128.png",
    "nativeCurrencyId": 2,
    "nativeCurrency": {
      "id": 2,
      "name": "Matic",
      "code": "MATIC"
    }
  }
]

export const Chains = {
  Ethereum: {
    chainId: 1,
    contractAddress: '0xc8807f0f5ba3fa45ffbdc66928d71c5289249014',
    openseaUrlChain: 'ethereum',
    urls: [
      getInfuraUrlFor('mainnet'),
      getAlchemyUrlFor('eth-mainnet'),
      'https://1rpc.io/eth',
      'https://cloudflare-eth.com',
    ].filter(Boolean),
  },
  Polygon: {
    chainId: 137,
    contractAddress: '0x1e289178612F5B6d32f692E312DcF783c74b2162',
    openseaUrlChain: 'matic',
    urls: [
      getInfuraUrlFor('polygon-mainnet'),
      'https://polygon-rpc.com',
      'https://polygon.llamarpc.com',
    ].filter(Boolean),
  },
  BSC: {
    chainId: 56,
    contractAddress: '0xd2e7b964770fcf51df088a5f0bb2d33a3c60cccf',
    openseaUrlChain: 'bsc',
    urls: [
      'https://bsc-dataseed1.binance.org/',
      'https://bsc-dataseed1.ninicoin.io/',
      'https://bsc-dataseed1.defibit.io/',
    ],
  },
  Manta: {
    chainId: 169,
    contractAddress: '0xBAb1c57ec0bB0aE81d948503E51d90166459D154',
    openseaUrlChain: 'manta',
    urls: ['https://pacific-rpc.manta.network/http', 'https://1rpc.io/manta'],
  },
}


export const AllChains = { ...Chains }

export const AllNetworks = {
  [Chains.Ethereum.chainId]: Chains.Ethereum,
  [Chains.Polygon.chainId]: Chains.Polygon,
  [Chains.BSC.chainId]: Chains.BSC,
  [Chains.Manta.chainId]: Chains.Manta,
}

/**
 * Retrieve Ispolink contract address based on the given chainId.
 *
 * @param chainId - decimal number
 * @returns {string}
 */
export function getIspolinkContract(chainId) {
  const contractAddress = AllNetworks[chainId]?.contractAddress
  return contractAddress
}
