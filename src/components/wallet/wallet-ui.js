'use client'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Avatar, Dialog, IconButton, Button, Popover } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDisconnect } from '@reown/appkit/react'
import { breakpointsUp } from '@/utils/responsive'
import useTokenBalance from '../web3/useTokenBalance'
import useNativeTokenBalance from '../web3/useNativeTokenBalance'
import { commify } from '@/utils/currencies'
import { CoingeckoCurrencyId, CoingeckoMarketQuery } from '@/utils/coingecko'
import { PercentLabel } from '../percentLabel'

export const BasicDialog = ({ title, onClose, open, ...props }) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <ChoiceDialog onClose={handleClose} open={open} {...props}>
      <DialogClose>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogClose>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </ChoiceDialog>
  )
}

const Details = ({
  handleDisconnect,
  nativeBalance = {},
  nativeMarketData = {},
  tokenBalance = {},
  tokenMarketData = {},
}) => {
  const nativeTokenBalanceUsdAmount =
    nativeBalance.balanceFormattedNumber * nativeMarketData?.current_price
  const tokenBalanceUsdAmount = tokenBalance.balanceFormattedNumber * tokenMarketData?.current_price
  const totalUsdAmount = tokenBalanceUsdAmount + nativeTokenBalanceUsdAmount

  return (
    <Container>
      <div className="top">
        <img src="./icon_wallet.svg" alt="wallet" width={16} height={16} />
        <p className="title">Your Wallet</p>
      </div>
      <div className="content">
        <div style={{ marginBottom: '24px' }}>
          <CurrencyBox>
            <PriceTotal>${commify(totalUsdAmount.toFixed(2))}</PriceTotal>
            <PriceTotalLabel>Total</PriceTotalLabel>
          </CurrencyBox>
          <div></div>
          <PercentRoundRectLabel
            value={
              nativeMarketData?.price_change_percentage_24h +
              tokenMarketData?.price_change_percentage_24h
            }
          />
        </div>
        <div>
          <CurrencyBox>
            <img alt="ggai" src="./giantai_logo_01.png" />
            <div>
              <CurrencyName>Giant AI</CurrencyName>
              <CurrencyValue>
                {commify(tokenBalance.balanceFormattedNumber.toFixed(5))} GGAI
              </CurrencyValue>
            </div>
          </CurrencyBox>
          <div>
            <CurrencyName>${commify(tokenBalanceUsdAmount.toFixed(2))}</CurrencyName>
            <CurrencyValue>${commify(tokenMarketData?.current_price?.toString())}</CurrencyValue>
          </div>
          <PercentRoundRectLabel
            size="small"
            value={tokenMarketData?.price_change_percentage_24h}
          />
        </div>
        <div>
          <CurrencyBox>
            <img
              alt="native"
              src="https://raw.githubusercontent.com/mikyjo/crypto_assets/main/blockchains/ethereum/eth_logo_128.png"
            />
            <div>
              <CurrencyName>{nativeMarketData?.name}</CurrencyName>
              <CurrencyValue>
                {`${commify(nativeBalance.balanceFormattedNumber.toFixed(5))} ${nativeMarketData?.symbol?.toUpperCase()}`}
              </CurrencyValue>
            </div>
          </CurrencyBox>
          <div>
            <CurrencyName>${commify(nativeTokenBalanceUsdAmount.toFixed(2))}</CurrencyName>
            <CurrencyValue>${commify(nativeMarketData?.current_price?.toString())}</CurrencyValue>
          </div>
          <PercentRoundRectLabel
            size="small"
            value={nativeMarketData?.price_change_percentage_24h}
          />
        </div>
      </div>
      <div className="bottom">
        <Button onClick={handleDisconnect}>
          <img src="./icon_wallet_disconnect.svg" alt="disconnect" width={24} height={24} />{' '}
          Disconnect
        </Button>
      </div>
    </Container>
  )
}

export function WalletDialog({ open, onClose }) {
  const [ethMarketData, setEthMarketData] = useState(null)
  const { disconnect } = useDisconnect()
  const nativeTokenBalance = useNativeTokenBalance()
  const tokenBalance = useTokenBalance()
  const coingeckoQuery = new CoingeckoMarketQuery([CoingeckoCurrencyId.ETH])

  useEffect(() => {
    coingeckoQuery.fetch().then(marketData => {
      setEthMarketData(marketData.find(item => item.id === CoingeckoCurrencyId.ETH))
    })
  }, [])

  const current_price = 0.00625

  // TODO: Retrieve market data once $GIANTAI token is listed on CoinGecko
  const giantAIMarketData = {
    current_price,
    price_change_percentage_24h: 0,
  }

  const handleDisconnect = () => {
    disconnect()
    onClose()
  }

  return (
    <BasicDialog open={open} onClose={onClose} className="details">
      <Details
        handleDisconnect={handleDisconnect}
        nativeBalance={nativeTokenBalance}
        nativeMarketData={ethMarketData}
        tokenBalance={tokenBalance}
        tokenMarketData={giantAIMarketData}
      />
    </BasicDialog>
  )
}

export function WalletPopover({ onClose, ...props }) {
  const [ethMarketData, setEthMarketData] = useState(null)
  const { disconnect } = useDisconnect()
  const nativeTokenBalance = useNativeTokenBalance()
  const tokenBalance = useTokenBalance()
  const coingeckoQuery = new CoingeckoMarketQuery([CoingeckoCurrencyId.ETH])

  useEffect(() => {
    coingeckoQuery.fetch().then(marketData => {
      setEthMarketData(marketData.find(item => item.id === CoingeckoCurrencyId.ETH))
    })
  }, [])

  const current_price = 0.00625

  // TODO: Retrieve market data once $GIANTAI token is listed on CoinGecko
  const giantAIMarketData = {
    current_price,
    price_change_percentage_24h: 0,
  }

  const handleDisconnect = () => {
    disconnect()
    onClose()
  }

  return (
    <Popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      onClose={onClose}
      {...props}
    >
      <Details
        handleDisconnect={handleDisconnect}
        nativeBalance={nativeTokenBalance}
        nativeMarketData={ethMarketData}
        tokenBalance={tokenBalance}
        tokenMarketData={giantAIMarketData}
      />
    </Popover>
  )
}

const ChoiceDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 16px;
    position: relative;
    min-width: 500px;
    overflow-y: unset;
    margin: 16px;

    ${breakpointsUp('min-width', [{ 0: '340px' }, { 1024: '500px' }])};
  }

  &.details .MuiPaper-root {
    padding: 20px;
  }
`

const DialogClose = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`

const DialogTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  span {
    margin-left: 8px;
  }
`

const DialogContent = styled.div``

const Container = styled.div`
  ${breakpointsUp('min-width', [{ 0: '240px' }, { 1024: '420px' }])};
  ${breakpointsUp('padding', [{ 0: '0' }, { 1024: '24px 24px 12px 24px' }])};

  &.dialog {
    min-width: auto;
    padding: 0;
    margin-top: -15px;
  }

  .top {
    display: flex;
    margin-bottom: 24px;

    .title {
      margin: 0;
      padding-left: 8px;
      font-size: 12px;
      font-weight: 600;
    }
  }

  .compact-wallet-content {
    padding-bottom: 24px;
  }

  .content {
    display: block;
    border-top: none;
    padding: 0;
    margin-top: 0;

    > div {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;

      > div:nth-of-type(2) {
        flex-grow: 1;
        text-align: right;
        padding-right: 16px;
      }
    }

    > div + div {
      margin-top: 16px;
    }
  }

  .bottom {
    display: flex;
    justify-content: center;
    padding-top: 12px;
    margin-top: 24px;
    border-top: 1px solid #cdd1d5;

    svg,
    svg path {
      margin: 8px;
    }

    .MuiButtonBase-root {
      width: 50%;
      border-radius: 0;
      font-size: 16px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      text-transform: none;
      color: #1c2d41;

      img {
        margin-right: 8px;
      }
    }
  }

  .dialog {
    justify-content: space-between;
    border: none;
    .MuiButtonBase-root {
      width: 48%;
      border-radius: 8px;
      flex-direction: column;
      padding: 12px 0;
    }
  }
`

const ChainIcon = styled(Avatar)`
  display: inline-flex;
  transform: scale(1.2);
`

const PriceTotal = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 4px;
`

const PriceTotalLabel = styled.div`
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  color: #919aa4;
`

const PercentRoundRectLabel = styled(PercentLabel)`
  border-radius: 8px;
  padding: 6px 12px;
  font-size: ${props => (props.size !== 'small' ? `1.5rem` : `1rem`)};
  font-weight: ${props => (props.size !== 'small' ? `600` : `500`)};
`

const CurrencyBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  img {
    ${breakpointsUp('width', [{ 0: '40px' }, { 1024: '54px' }])};
    ${breakpointsUp('height', [{ 0: '40px' }, { 1024: '54px' }])};
    margin-right: 8px;
  }
`

const CurrencyName = styled.div`
  ${breakpointsUp('font-size', [{ 0: '0.875rem' }, { 1024: '1rem' }])};
  font-weight: 600;
`
const CurrencyValue = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #919aa4;
`
