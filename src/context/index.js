// context/index.js
'use client'

import React, { useEffect } from 'react'
import { wagmiAdapter, reownProjectId } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cookieToInitialState, WagmiProvider } from 'wagmi'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { baseSepolia } from 'wagmi/chains'
import { useChainId, useChains } from 'wagmi'
import { NEXT_PUBLIC_CDP_PROJECT_ID, NEXT_PUBLIC_ONCHAINKIT_API_KEY } from '@/config/env'

// Set up queryClient
const queryClient = new QueryClient()

if (!reownProjectId) {
  throw new Error('Project ID is not defined')
}

function OnchainKit({ children }) {
  const chainId = useChainId()
  const chains = useChains()
  const chain = chains.find(c => c.id === chainId) || baseSepolia

  return (
    <OnchainKitProvider
      projectId={NEXT_PUBLIC_CDP_PROJECT_ID}
      apiKey={NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={chain}
      config={{
        appearance: {
          name: 'Giant.AI',
          logo: './giantai_logo_01.png',
          mode: '400',
          theme: 'default',
        },
        wallet: {
          display: 'modal',
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  )
}

function ContextProvider({ children, cookies }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKit>{children}</OnchainKit>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
