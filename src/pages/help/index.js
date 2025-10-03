import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Tab, Tabs } from '@mui/material'
import { breakpointsDown } from '@/utils/responsive'
import LeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import RightIcon from '@mui/icons-material/KeyboardArrowRight'

export default function Help({ open, onClose }) {
  const [tab, setTab] = useState(100)
  const [isShowInfo, setIsShowInfo] = useState(false)

  const labels = ['Intro', 'X (Twitter) AI KOL', 'Trade']

  const onChangeTab = (_, newTab) => {
    setIsShowInfo(true)
    setTab(newTab)
  }

  useEffect(() => {
    if (!isShowInfo) {
      setTab(100)
    }
  }, [isShowInfo])

  return (
    <Container open={open} onClose={onClose} maxWidth="xl" onClick={onClose}>
      {!isShowInfo && (
        <Title className="sub-title" onClick={() => window.history.back()}>
          <LeftIcon /> Help Center
        </Title>
      )}
      {isShowInfo && (
        <Title className="sub-title" onClick={() => setIsShowInfo(false)}>
          <LeftIcon />
          {labels[tab]}
        </Title>
      )}

      <TabContainer>
        {!isShowInfo && (
          <StyledTabs orientation="vertical" value={tab} onChange={onChangeTab}>
            {labels.map((label, index) => (
              <Tab icon={<RightIcon />} label={label} key={index} />
            ))}
            <Tab value={100} style={{ display: 'none' }} />
          </StyledTabs>
        )}
        {isShowInfo && tab === 0 && (
          <TabPanel>
            <img src="/welcome-giantai-banner-wide.png" alt="Intro" />
            <TabContent>
              🤖 The Giant AI app unleashes the full AI-capabilities of our Open Source Agent: take
              advantage of the exclusive paid features, fully on-chain, that allow you to tailor the
              agent according to your needs:
              <br />
              <br />
              1. AI KOL replies - powerful X post analysis and content creation as world class
              Influencer so even Elon Musk would envy you
              <br />
              2. Repost with Comment and be the smartest kid on the block
              <br />
              3. Like & Repost eloquently with a style
              <br />
              <br />
              $GIANTAI is rewarding active users! Deflationary token by design: 50% of the fees
              collected from the paid features are burnt forever 🚀
            </TabContent>
          </TabPanel>
        )}
        {isShowInfo && tab === 1 && (
          <TabPanel>
            <div>
              <video src="/giant-ai-app-demo.mp4" autoPlay loop />
            </div>
            <TabContent>
              Want Giant AI to interact to a X (Twitter) post? Do you want it shill your favorite
              $COIN? With the Giant AI app, you can send an X (Twitter) link and ask Giant AI to
              Like, Repost, or leave a Smart reply to any thread.
              <br />
              <br />
              How it works: Go to the <Link href="/">App page</Link>, select your desired action and
              publish a blockchain TX to the Giant AI contract.
              <br />
              <br />
              Deflationary token by design: 50% of the fee covers the publishing costs, the other
              50% are burnt forever 🚀
            </TabContent>
          </TabPanel>
        )}
        {isShowInfo && tab === 2 && (
          <TabPanel>
            <img src="/giant-ai-trade-overview.png" alt="Trade" />
            <TabContent>
              Want to use Giant AI KOL feature but don't have $GIANTAI tokens? We got you covered!
              <br />
              <br />
              Go the <Link href="/trade">Trade page</Link> and simply enter the $GIANTAI amount you
              want to buy. We'll route your request through various DEXs to ensure the best price
              quotes!
            </TabContent>
          </TabPanel>
        )}
      </TabContainer>
    </Container>
  )
}

const Container = styled.div`
  background: ${props => props.theme.palette.colors.background} !important;
  overflow: hidden;
  height: calc(100vh - 60px);
  margin-top: 16px;
`

const Title = styled.div`
  position: relative;
  padding: 0 0 16px 16px;
  color: ${props => props.theme.palette.colors.title};
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  border-bottom: 1px solid ${props => props.theme.palette.colors.header.border};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${breakpointsDown('padding', [{ 413: '0 0 16px 8px' }])};
  &.sub-title {
    padding-left: 36px;
  }
  svg {
    position: absolute;
    font-size: 2rem;
    left: 8px;
    top: -2px;
    ${breakpointsDown('left', [{ 413: '0px' }])};
  }
  .hidden {
    display: none;
  }
`

const TabContainer = styled.div`
  display: flex;
  overflow-y: auto;
`

const StyledTabs = styled(Tabs)`
  min-width: 100%;
  .MuiTab-root {
    opacity: 1;
    max-width: none;
    min-height: auto;
    padding: 16px;
    align-items: flex-start;
    ${breakpointsDown('padding-left', [{ 413: '8px' }])};
    border-bottom: 1px solid #${props => props.theme.palette.colors.header.border};
    text-transform: none;
    font-size: 1rem;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .MuiSvgIcon-root {
      position: absolute;
      font-size: 2rem;
      right: 0;
      top: 9px;
    }

    &.Mui-selected {
      color: inherit;
    }
  }
  .MuiTabs-indicator {
    width: 0;
  }
`

const TabPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  ${breakpointsDown('padding', [{ 413: '16px 8px' }])};
  height: calc(100vh - 108px);

  > div,
  img {
    max-width: 800px;
    width: 100%;
  }

  > img,
  video {
    border-radius: 8px;
    border: 1px solid ${props => props.theme.palette.colors.header.border};
  }
`

const TabContent = styled.div`
  display: inline;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  padding: 24px 0;

  a {
    font-weight: 600;
    text-decoration: none;
    color: ${props => props.theme.palette.colors.link};
  }
`
