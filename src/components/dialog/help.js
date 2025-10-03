import React, { useState } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Button, Dialog, Tab, Tabs } from '@mui/material'
import { Close } from '@mui/icons-material'

export default function HelpCenter({ open, onClose }) {
  const [tab, setTab] = useState(0)

  const onChangeTab = (_, newTab) => {
    setTab(newTab)
  }

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="xl">
      <Title>Help Center</Title>
      <CloseButton onClick={onClose}>
        <Close />
      </CloseButton>
      <TabContainer>
        <StyledTabs orientation="vertical" value={tab} onChange={onChangeTab}>
          <Tab label="Intro" />
          <Tab label="X (Twitter) AI KOL" />
          <Tab label="Trade " />
        </StyledTabs>
        {tab === 0 && (
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
        {tab === 1 && (
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
              How it works: Go to the{' '}
              <Link href="/" onClick={onClose}>
                App page
              </Link>
              , select your desired action and publish a blockchain TX to the Giant AI contract.
              <br />
              <br />
              Deflationary token by design: 50% of the fee covers the publishing costs, the other
              50% are burnt forever 🚀
            </TabContent>
          </TabPanel>
        )}
        {tab === 2 && (
          <TabPanel>
            <img src="/giant-ai-trade-overview.png" alt="Trade" />
            <TabContent>
              Want to use Giant AI KOL feature but don't have $GIANTAI tokens? We got you covered!
              <br />
              <br />
              Go the{' '}
              <Link href="/trade" onClick={onClose}>
                Trade page
              </Link>{' '}
              and simply enter the $GIANTAI amount you want to buy. We'll route your request through
              various DEXs to ensure the best price quotes!
            </TabContent>
          </TabPanel>
        )}
      </TabContainer>
    </StyledDialog>
  )
}

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    height: 90vh;
    background: ${props => props.theme.palette.colors.background};
    border-radius: 24px;

    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.palette.colors.link};
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      opacity: 0.5;
    }
  }
`

const Title = styled.div`
  display: flex;
  margin: 20px 20px 10px;
  color: ${props => props.theme.palette.colors.title};
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
`

const CloseButton = styled(Button)`
  border: none;
  border-radius: 50%;
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 4px;
  min-width: auto;
  color: #495767;
`

const TabContainer = styled.div`
  display: flex;
`

const StyledTabs = styled(Tabs)`
  min-width: 320px;
  margin: 16px 0;
  button {
    opacity: 1;
    max-width: none;
    align-items: flex-start;
    text-transform: none;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    padding-left: 20px;
    text-align: left;
  }
  .Mui-selected {
    color: ${props => props.theme.palette.colors.link};
  }
  .MuiTabs-indicator {
    background-color: ${props => props.theme.palette.colors.link};
    width: 4px;
    left: 0;
    transform: scaleY(0.75);
  }
`

const TabPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 12px;
  border: solid 1px ${props => props.theme.palette.colors.header.border};
  margin: 0 20px 20px;

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
  padding-top: 28px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;

  a {
    font-weight: 600;
    text-decoration: none;
    color: ${props => props.theme.palette.common.blue};
  }
`
