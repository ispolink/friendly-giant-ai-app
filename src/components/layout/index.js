import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useAppKitAccount } from '@reown/appkit/react'
// import Header from './header';
import dynamic from 'next/dynamic'
import Sidemenu from './sidemenu'
import { breakpointsUp } from '@/utils/responsive'
import { useMediaQuery } from '@mui/material'
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
      <Content>{children}</Content>
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
