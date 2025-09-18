'use client'
import { useState } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Tabs, Tab, useMediaQuery, SwipeableDrawer } from '@mui/material'
import { useDisconnect } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { breakpointsDown } from '@/utils/responsive'
import { KeyboardArrowRight } from '@mui/icons-material'
import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity'

import IconApp from '@/assets/icon-app.svg'
import IconTrade from '@/assets/icon_trade.svg'
import IconHelp from '@/assets/icon-help.svg'
import IconLogout from '@/assets/icon-logout.svg'
const logo = './logo_giant-ai_color.svg'
const logoShort = './icon_only_logo_giant-ai_color.svg'

const Logo = ({ ...props }) => {
  return <img alt="" {...props} src={logo} />
}

const LogoShort = ({ ...props }) => {
  return <img alt="" {...props} src={logoShort} />
}

export default dynamic(
  () =>
    Promise.resolve(function Sidemenu({ isOpenSidemenu, setOpenSidemenu }) {
      const [selectedItem, setSelectedItem] = useState('/')

      const handleChange = (_ev, value) => {
        setSelectedItem(value)
      }

      const isMobile = useMediaQuery('(max-width:768px)')
      const { disconnect } = useDisconnect()
      const { address } = useAccount()

      const TAB_LIST = [
        {
          label: 'App',
          href: '/',
          icon: <IconApp />,
        },
        {
          label: 'Trade',
          href: '/trade',
          icon: <IconTrade />,
        },
        {
          label: 'Help Center',
          href: '/help',
          icon: <IconHelp />,
        },
        {
          label: 'Logout',
          href: '',
          icon: <IconLogout />,
          onClick: () => disconnect(),
        },
      ]

      const TabPanel = () => (
        <StyledTabs
          className="full-height"
          orientation="vertical"
          variant="scrollable"
          scrollButtons={false}
          indicatorColor="primary"
          value={selectedItem}
          onChange={handleChange}
          mode={isOpenSidemenu ? 'expanded' : 'collapsed'}
        >
          <IdentityContainer>
            <Identity
              address={address}
              schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
            >
              <Avatar />
              <Name>
                <Badge />
              </Name>
              <Address />
            </Identity>
          </IdentityContainer>

          {TAB_LIST.map((tab, index) => (
            <Tab
              key={index}
              className={`nav-menu-item ${tab.label === 'Logout' ? 'logout' : ''} ${tab.href === selectedItem ? 'active' : ''}`.trim()}
              icon={tab.icon}
              iconPosition="start"
              component={Link}
              value={tab.href}
              href={tab.href}
              label={isOpenSidemenu ? tab.label : ''}
              onClick={tab.onClick}
            />
          ))}
        </StyledTabs>
      )

      return isMobile ? (
        <Drawer
          anchor="left"
          open={isOpenSidemenu}
          onClose={() => setOpenSidemenu(false)}
          onOpen={() => setOpenSidemenu(true)}
          variant="temporary"
        >
          <Logo alt="GIANT.AI" />
          <TabPanel />
        </Drawer>
      ) : (
        <Container
          className={isOpenSidemenu ? 'expanded' : 'collapsed'}
          variant="permanent"
          anchor="bottom"
        >
          <HambrugerButton
            className={isOpenSidemenu ? 'expanded' : 'collapsed'}
            onClick={() => setOpenSidemenu(!isOpenSidemenu)}
          >
            <KeyboardArrowRight />
          </HambrugerButton>
          {isOpenSidemenu && <Logo alt="GIANT.AI" />}
          {!isOpenSidemenu && <LogoShort alt="GIANT.AI" />}
          <TabPanel />
        </Container>
      )
    }),
  { ssr: false }
)

const Container = styled.div`
  position: fixed;
  background-color: ${props => props.theme.palette.background.paper};
  width: 256px;
  ${breakpointsDown('width', [{ 414: '77vw' }])};
  max-width: 256px;
  flex-shrink: 0;
  transition: all 0.2s ease;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 1000;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  .MuiPaper-root {
    width: 256px;
    ${breakpointsDown('width', [{ 414: '77vw' }, { 360: '84vw' }])};
    max-width: 256px;
    ${breakpointsDown('width', [{ 360: '304dp' }])};
    border: none;
    transition: all 0.2s ease;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  &.collapsed {
    width: 72px;
    .MuiPaper-root {
      width: 72px;
    }
  }

  > img {
    height: 28px;
    ${breakpointsDown('height', [{ 768: '24px' }])};
    margin-top: 32px;
    margin-left: 22px;
  }
`

const HambrugerButton = styled.div`
  position: fixed;
  top: 36px;
  width: 26px;
  height: 26px;
  background-color: ${props => props.theme.palette.background.paper};
  border: solid 1px gray;
  border-radius: 100px;
  cursor: pointer;
  z-index: 1000;
  svg {
    fill: ${props => props.theme.palette.text.primary};
  }

  &.expanded {
    left: 240px;

    svg {
      transform: rotate(180deg);
    }
  }

  &.collapsed {
    left: 58px;
  }
`

const StyledTabs = styled(Tabs)`
  margin-top: 16px;

  .MuiTabs-list {
    min-height: calc(100vh - 115px);
    padding: 0 4px 0 9px;
  }

  .MuiTabs-indicator {
    left: 0;
    width: 4px;
  }

  .MuiTab-root {
    font-size: 1rem;
    min-width: 56px;
    max-height: 50px;
    min-height: 50px;
    border-radius: 50px;
    padding-left: ${props => (props.mode === 'expanded' ? '20.5px' : '16px')};
    justify-content: start;
    text-transform: none;
    color: ${props => props.theme.palette.text.primary};

    &:hover {
      background-color: ${props => props.theme.palette.colors.header.globalSearch.background};
      color: ${props => props.theme.palette.common.blue};
      svg path {
        fill: ${props => props.theme.palette.common.blue};
      }
    }

    &.logout {
      margin-top: auto;
    }

    &.active {
      color: ${props => props.theme.palette.common.blue};
      svg path {
        fill: ${props => props.theme.palette.common.blue};
      }
    }

    > svg {
      width: 24px;
      height: 24px;
      margin-right: 12px;

      path {
        fill: ${props => props.theme.palette.text.primary};
      }
    }
  }
`

const Drawer = styled(SwipeableDrawer)`
  .MuiDrawer-paper {
    min-width: 256px;
    > img {
      object-fit: contain;
      object-position: left;
      height: 28px;
      margin-top: 28px;
      margin-left: 22px;
    }
  }
`

const IdentityContainer = styled.div`
  margin: 48px 0;
  cursor: default;
  > * {
    background: transparent !important;
  }
`
