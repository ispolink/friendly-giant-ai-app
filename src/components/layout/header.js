'use client';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Avatar, Button } from '@mui/material'
import { useAppKitAccount, useAppKitNetwork, useWalletInfo, useDisconnect } from '@reown/appkit/react';
import { appKitModal } from '@/config';
import { chains } from '@/config/chain'
import { breakpointsUp, DesktopTabeltViewWrapper, MobileViewWrapper, } from '@/utils/responsive';
import useTokenBalance from '../web3/useTokenBalance';
import { formatTokenAmount } from '@/utils/currencies';

const logoSVG_W = './ispolink_logo_blue_w.svg';
const logoSVG_B = './ispolink_logo_blue_b.svg';

const tokenIcon = './giantai_logo_01.png';

const Logo = ({ ...props }) => {
  const theme = useTheme()
  return <img alt="" {...props} src={theme.palette.mode === 'dark' ? logoSVG_W : logoSVG_B} />
}

const IspolinkLogo = ({ ...props }) => {
  return <img alt="" {...props} src={tokenIcon} />
}

export default function Header () {
  const [chain, setChain] = useState()

  const accountState = useAppKitAccount()
  const { chainId } = useAppKitNetwork()
  const { walletInfo } = useWalletInfo()
  const { disconnect } = useDisconnect()
  const tokenBalance = useTokenBalance()

  const isActive = accountState.isConnected

  useEffect(() => {
    if (chainId) {
      if (chainId != chain?.chainId) {
        const _chain = chains.find(c => c.chainId == chainId)
        setChain(_chain)
      }
    }
  }, [chainId])
  

  return (
    <Container>
      <Logo alt="Ispolink" />
      {isActive ?
        (
          <>
            <DesktopTabeltViewWrapper>
              <ButtonBox>
                <RoundButton style={{ maxWidth: '300px' }}>
                  <RoundButtonIcon>
                    <IspolinkLogo />
                  </RoundButtonIcon>
                  <BalanceLabel end="">{formatTokenAmount(tokenBalance.balance)}</BalanceLabel> $GGAI
                </RoundButton>
                <RoundButton
                  onClick={() => appKitModal.open({ view: 'Networks' })}
                >
                  <RoundButtonIcon>
                    {chain ? <ChainIcon alt={chain.name} src={chain.logoUrl} /> : null}
                  </RoundButtonIcon>
                  {chain?.name || 'Unsupported network'}
                </RoundButton>
                <RoundButton
                  width="200px"
                  onClick={() => disconnect()}
                >
                  {walletInfo?.icon && (<RoundButtonIcon><img src={walletInfo?.icon} alt="icon"/></RoundButtonIcon>)}
                  <WalletAddress end={accountState?.address.slice(-4)}>
                    {accountState?.address.slice(0, 5) + '...'}
                  </WalletAddress>
                </RoundButton>
              </ButtonBox>
            </DesktopTabeltViewWrapper>
            <MobileViewWrapper>
              <RoundButton
                width="220px"
                onClick={() => disconnect()}
              >
                {walletInfo?.icon && (<RoundButtonIcon><img src={walletInfo?.icon} alt="icon"/></RoundButtonIcon>)}
                <RoundButtonIcon>
                  {chain ? <img alt={chain.name} src={chain.logoUrl} /> : null}
                </RoundButtonIcon>
                <WalletAddress end={accountState?.address.slice(-4)}>
                  {accountState?.address.slice(0, 5) + '...'}
                </WalletAddress>
              </RoundButton>
            </MobileViewWrapper>
          </>
        )
        :
        <BlueButton onClick={() => appKitModal.open()}>Connect Wallet</BlueButton>
      }
    </Container>
  );
}

const BlueButton = styled(Button)`
  ${props => breakpointsUp('color', [{ 0: props.theme.palette.primary.main }, { 1024: props.theme.palette.primary.contrastText }])};
  ${props => breakpointsUp('background', [{ 0: props.theme.palette.background.paperBorder }, { 1024: props.theme.palette.primary.main }])};
  padding: 8px 18px;
  border-radius: 100px;
  ${breakpointsUp('font-size', [{ 0: '0.75rem' }, { 1024: '1.125rem' }, { 1536: '1.125rem;' }])};
  text-transform: none;
`

const RoundButton = styled(({ width, ...props }) => <Button {...props} />)`
  background: ${props => props.theme.palette.colors.header.button.background};
  background-color: ${props => props.theme.palette.colors.header.themeSwitch.background} !important;
  border-radius: 100px;
  cursor: pointer;
  ${breakpointsUp('padding', [{ 0: '4px 6px' }, { 1024: '8px 16px' }])};
  color: ${props => props.theme.palette.colors.header.button.text};
  ${breakpointsUp('font-size', [{ 0: '0.75rem' }, { 1024: '1.125rem' }])};
  font-weight: 600;
  text-transform: unset;
  max-width: ${({ width }) => width || 'initial'};
  ${breakpointsUp('height', [{ 0: '32px' }, { 1024: '48px' }])};
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.theme.palette.colors.header.button.backgroundHover} !important;
  }
`

const RoundButtonIcon = styled.div`
  display: inline-block;
  ${breakpointsUp('width', [{ 0: '24px' }, { 1024: '32px' }])};
  ${breakpointsUp('height', [{ 0: '24px' }, { 1024: '32px' }])};
  ${breakpointsUp('min-width', [{ 0: '24px' }, { 1024: '32px' }])};
  ${breakpointsUp('max-width', [{ 0: '24px' }, { 1024: '32px' }])};
  ${breakpointsUp('margin-right', [{ 0: '4px' }, { 1024: '8px' }])};
  border-radius: 100px;
  border: solid 1px ${props => props.theme.palette.colors.header.icon.border};
  fill: ${props => props.theme.palette.colors.header.icon.color};
  background: ${props => props.theme.palette.colors.header.icon.background};
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    ${breakpointsUp('width', [{ 0: '14px' }, { 1024: '20px' }])};
    ${breakpointsUp('height', [{ 0: '14px' }, { 1024: '20px' }])};
  }
`

const WalletAddress = styled.span`
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  ${breakpointsUp('padding-right', [{ 0: '32px' }, { 1024: '48px' }])};
  &:after {
    content: attr(end);
    position: absolute;
    right: 0;
    top: 0;
    text-align: left;
  }
  & svg {
    margin: 0 !important;
  }
`

const ChainIcon = styled(Avatar)`
  display: inline-flex;
  transform: scale(1.2);
`

const BalanceLabel = styled.span`
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  margin-right: 8px;
`

const ButtonBox = styled.div`
  > * {
    margin-left: 8px !important;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // position: sticky;
  top: 0;
  left: 0;
  padding: ;
  ${breakpointsUp('padding', [{ 0: '12px 16px 0' }, { 1024: '24px 32px 0' }])};
  > img {
    ${breakpointsUp('height', [{ 0: '32px' }, { 1024: '38px' }])};
  }

  ${BlueButton} {
    ${breakpointsUp('margin-right', [{ 0: '0' }, { 1024: '16px' }])};
  }
`