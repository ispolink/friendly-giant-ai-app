// pages/index.js
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import {
  FundCardAmountInput,
  FundCardAmountInputTypeSwitch,
  FundCardPresetAmountInputList,
  FundCardPaymentMethodDropdown,
  FundCardSubmitButton,
} from '@coinbase/onchainkit/fund'
import {
  Swap,
  SwapAmountInput,
  SwapButton,
  SwapMessage,
  SwapSettings,
  SwapToast,
  SwapToggleButton,
} from '@coinbase/onchainkit/swap'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useSymbol } from '@/components/web3/useSymbol'
import { useChainId } from 'wagmi'
import { getTokenContractAddress } from '@/config/chain'
import { breakpointsUp } from '@/utils/responsive'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import SettingsIcon from '@mui/icons-material/Settings'
import { Help } from '@mui/icons-material'

const CbFundCard = dynamic(() => import('@coinbase/onchainkit/fund').then(mod => mod.FundCard), {
  ssr: false,
})

const tokenIcon = './giantai_logo_01.png'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  )
}

export default function Trade() {
  const chainId = useChainId()
  const { refetch: refetchSymbol } = useSymbol()

  const [tabIndex, setTabIndex] = useState(1)
  const [tokenSymbol, setTokenSymbol] = useState('GIANTAI')

  const [ethToken, setETHToken] = useState({
    name: 'ETH',
    address: '',
    symbol: 'ETH',
    decimals: 18,
    image: 'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png',
    chainId: 8453,
  })

  const [ggaiToken, setGGAIToken] = useState({
    name: 'GIANT AI',
    address: '0xB46F91E0747BB858917ea399392F141750c03CBc',
    symbol: tokenSymbol,
    decimals: 6,
    image: tokenIcon,
    chainId: 8453,
  })

  useEffect(() => {
    ;(async () => {
      const symbolResult = await refetchSymbol()
      if (symbolResult.status != 'success') {
        setTimeout(refetchSymbol, 1000)
      } else {
        setTokenSymbol(symbolResult.data)
      }
    })()
  }, [])

  useEffect(() => {
    setGGAIToken({
      ...ggaiToken,
      symbol: tokenSymbol,
    })
  }, [tokenSymbol])

  useEffect(() => {
    setETHToken({
      ...ethToken,
      chainId: chainId,
    })
    setGGAIToken({
      ...ggaiToken,
      address: getTokenContractAddress(chainId),
      chainId: chainId,
    })
  }, [chainId])

  const onChangeTabIndex = (event, newValue) => {
    setTabIndex(newValue)
  }

  return (
    <TradeContainer>
      <Card>
        {/* <CardHeader>
          <Tabs value={tabIndex} onChange={onChangeTabIndex}>
            <Tab label="Fund" />
            <Tab label="Swap" />
          </Tabs>
          <ButtonStack>
            <Tooltip title="Easily purchase ETH and GIANTAI Tokens using your debit card or swap your Tokens with the best rates.">
              <IconButton>
                <Help />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </ButtonStack>
        </CardHeader> */}
        <TabPanel value={tabIndex} index={0}>
          <FundCard assetSymbol="ETH" currency="USD" presetAmountInputs={['10', '20', '100']}>
            <h2>Buy ETH</h2>
            <FundCardAmountInput />
            <FundCardAmountInputTypeSwitch className="FundCardAmountInputTypeSwitch" />
            <FundCardPresetAmountInputList className="FundCardAmountInput" />
            <FundCardPaymentMethodDropdown />
            <FundCardSubmitButton />
          </FundCard>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <SwapCard>
            <Swap>
              <SwapSettings />
              <SwapAmountInput
                className="SwapAmountInput"
                label="Sell"
                swappableTokens={[ethToken]}
                token={ethToken}
                type="from"
              />
              <SwapToggleButton />
              <SwapAmountInput
                className="SwapAmountInput"
                label="Buy"
                swappableTokens={[ggaiToken]}
                token={ggaiToken}
                type="to"
              />
              <SwapButton />
              <SwapMessage />
              <SwapToast />
            </Swap>
          </SwapCard>
        </TabPanel>
      </Card>
    </TradeContainer>
  )
}

const TradeContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 128px);
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .MuiTabs-list {
    border-bottom: 1px solid ${props => props.theme.palette.divider};
  }

  .Mui-selected {
    color: #6f91ff;
  }

  .MuiTabs-indicator {
    background-color: #6f91ff;
    height: 4px;
  }

  .MuiTab-root {
    font-size: 1.125rem;
    padding-left: 0;
    padding-right: 0;
  }
`

const Card = styled.div`
  background: ${props => props.theme.palette.background.paper};
  padding: 12px 24px 24px;
  ${breakpointsUp('width', [{ 0: 'calc(100% - 24px)' }, { 1024: '496px' }])};
  max-width: 496px;
  margin: 24px auto;
  border-radius: 8px;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .MuiTabs-root {
    flex-grow: 1;
  }
`

const ButtonStack = styled.div`
  .MuiButtonBase-root {
    color: ${props => props.theme.palette.text.primary};
    padding: 6px;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`

const FundCard = styled(CbFundCard)`
  background: transparent !important;
  border: none;
  padding: 16px 0 0 0 !important;

  h2,
  .text-sm {
    font-size: 0.875rem;
  }
  .text-xl {
    font-size: 3.5rem;
  }

  .FundCardAmountInputTypeSwitch {
    > button {
      display: none;
    }
    opacity: 0.6;
  }

  .FundCardAmountInput {
    display: flex;
    justify-content: space-around;
    margin: 16px 0;

    button {
      border: 1px solid ${props => props.theme.palette.divider} !important;
      border-radius: 8px !important;
      font-size: 1.125rem !important;
      width: 144px !important;
      padding-top: 6px !important;
      padding-bottom: 6px !important;
    }
  }

  > form > button {
    border-radius: 100px !important;
    color: ${props => props.theme.palette.primary.contrastText} !important;
    background: #6f91ff !important;
  }
`

const SwapCard = styled.div`
  > div {
    background: transparent !important;
    border: none;
    padding: 16px 0 0 0 !important;

    h3 {
      display: none;
    }

    > button {
      border-radius: 100px !important;
      color: ${props => props.theme.palette.primary.contrastText} !important;
      background: #6f91ff !important;
    }
  }

  .SwapAmountInput {
    background: ${props => props.theme.palette.colors.swapbox.background} !important;

    button {
      box-shadow: none !important;
    }
  }
`
