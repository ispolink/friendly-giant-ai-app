import { Interface } from '@ethersproject/abi'
import ERC20_ABI from './erc20-abi.json'
import ERC20_BYTES32_ABI from './erc20-abi-bytes32.json'

export const ERC20_INTERFACE = new Interface(ERC20_ABI)

export const ERC20_BYTES32_INTERFACE = new Interface(ERC20_BYTES32_ABI)


export { ERC20_ABI, ERC20_BYTES32_ABI }
