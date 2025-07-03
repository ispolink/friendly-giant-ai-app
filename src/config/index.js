// config/index.j

// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, polygon, bsc, baseSepolia } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const reownProjectId = process.env.REACT_APP_REOWN_PROJECT_ID || 'PROJECT_ID'

if (!reownProjectId) {
  throw new Error('Reown Project ID is not defined')
}

export const mainNetworks = [
  // mainnet, polygon, bsc
]
export const testNetworks = [baseSepolia]
export const networks = [...mainNetworks, ...testNetworks]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId: reownProjectId,
  networks,
})

export const config = wagmiAdapter.wagmiConfig

// Set up metadata
const metadata = {
  name: 'Friendly Giant AI',
  description: 'Friendly Giant AI',
  url: 'https://giant-ai.ispolink.com', // origin must match your domain & subdomain
  icons: ['https://app.ispolink.com/favicon.ico'],
}

// Create the modal
export const appKitModal = createAppKit({
  adapters: [wagmiAdapter],
  projectId: reownProjectId,
  networks,
  metadata,
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase Wallet
  ],
  themeMode: 'dark',
  enableWallets: true,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    swaps: false,
    onramp: false,
    email: false,
    socials: false,
  },
})
