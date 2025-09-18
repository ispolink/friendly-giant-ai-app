import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import { useAppKitAccount } from '@reown/appkit/react'
import { Wallet } from '@coinbase/onchainkit/wallet'
import { Button, useMediaQuery } from '@mui/material'
import { breakpointsUp } from '@/utils/responsive'
import Sidemenu from './sidemenu'

const Header = dynamic(() => import('./header'), { ssr: false })

export default function RootLayout({ children, className, ...props }) {
  const isMobile = useMediaQuery('(max-width:768px)')
  const accountState = useAppKitAccount()

  const [isOpenSidemenu, setOpenSidemenu] = useState(true)

  useEffect(() => {
    if (isMobile) {
      setOpenSidemenu(false)
    }
  }, [isMobile])

  return (
    <Container
      className={
        className + (accountState.isConnected ? (isOpenSidemenu ? ' expanded' : ' collapsed') : '')
      }
      {...props}
    >
      <Header setOpenSidemenu={setOpenSidemenu} />
      <Content>
        {accountState.isConnected ? (
          children
        ) : (
          <WelcomeContainer>
            <WelcomeSubContainer>
              <WelcomeTitle>Welcome to the Friendly Giant AI Agent</WelcomeTitle>
              <img src="./icon_wallet_not_connected.png" alt="Wallet not connected" />
              <SubTitleContainer>
                <SubTitle>Your wallet isn't connected yet</SubTitle>
                <Text>
                  To use our services you need to connect your wallet. Please click on the button
                  below to connect it.
                </Text>
                <Wallet className="WalletConnect" />
              </SubTitleContainer>
            </WelcomeSubContainer>
          </WelcomeContainer>
        )}
      </Content>
      {accountState.isConnected && (
        <Sidemenu isOpenSidemenu={isOpenSidemenu} setOpenSidemenu={setOpenSidemenu} />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${props => props.theme.palette.colors.default};

  &.expanded {
    ${breakpointsUp('padding-left', [{ 0: '0' }, { 768: '256px' }])};
  }

  &.collapsed {
    ${breakpointsUp('padding-left', [{ 0: '0' }, { 768: '72px' }])};
  }
`

const Content = styled.div`
  color: ${props => props.theme.palette.text.primary};
  a {
    color: ${props => props.theme.palette.colors.anchor.normal};
  }
`

const WelcomeContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  background: ${props => props.theme.palette.background.paper};
  ${breakpointsUp('padding', [{ 0: '32px' }, { 1024: '64px' }, { 1536: '64px;' }])};
  ${breakpointsUp('margin', [{ 0: '16px' }, { 1024: '32px' }, { 1536: '32px 140px 32px;' }])};
  ${breakpointsUp('border-radius', [{ 0: '16px' }, { 1024: '24px' }, { 1536: '24px;' }])};
`

const WelcomeSubContainer = styled.div`
  max-width: 840px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 136px;
    height: 136px;
    margin-bottom: 16px;
  }

  .WalletConnect {
    width: 100%;
  }

  .WalletConnect button {
    width: 100%;
    color: ${props => props.theme.palette.warning.contrastText};
    background: ${props => props.theme.palette.warning.main};
    padding: 8px 18px;
    border-radius: 100px;
    font-size: 1.125rem;
    text-transform: none;
  }
`

const WelcomeTitle = styled.div`
  width: 100%;
  text-align: center;
  line-height: 1.1;
  font-weight: 600;
  ${breakpointsUp('font-size', [{ 0: '2rem' }, { 1024: '5rem' }, { 1536: '5rem;' }])};
  ${breakpointsUp('margin-bottom', [{ 0: '32px' }, { 1024: '55px' }, { 1536: '55px' }])};
`

const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SubTitle = styled.div`
  width: 100%;
  text-align: center;
  line-height: 1;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 12px;
`

const Text = styled.div`
  width: 256px;
  text-align: center;
  line-height: 1.43;
  font-weight: normal;
  font-size: 0.875rem;
  margin-bottom: 24px;
`

const RedButton = styled(Button)`
  width: 100%;
  color: ${props => props.theme.palette.warning.contrastText};
  background: ${props => props.theme.palette.warning.main};
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 1.125rem;
  text-transform: none;
  line-height: 1.5;
`
