import { useEffect, useState } from 'react';
import { useAppKitAccount, useAppKitProvider, useAppKitNetwork } from '@reown/appkit/react';
import { BigNumber } from '@ethersproject/bignumber'
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { ERC20_ABI } from '@/abis/erc20';
import { getIspolinkContract } from '@/config/chain';

export const useIspBalance = () => {
  const [balance, setBalance] = useState({})

  const { walletProvider } = useAppKitProvider('eip155')
  const { chainId } = useAppKitNetwork()
  const accountState = useAppKitAccount()
  const isActive = accountState.isConnected

  async function getBalance() {
    if (!isActive) throw Error('User disconnected')

    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const ispTokenAddr = getIspolinkContract(chainId)
    const ispContract = new Contract(ispTokenAddr, ERC20_ABI, signer)
    const balance = await ispContract.balanceOf(accountState?.address)

    return BigNumber.from(balance)
  }
  
  useEffect(() => {
    getBalance()
    .then(setBalance)
    .catch(e => {
      setBalance(BigNumber.from(0))
    })
  }, [accountState, walletProvider])

  return balance
}

export default useIspBalance
